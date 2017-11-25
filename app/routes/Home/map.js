import React from "react";
import { StyleSheet, Text, View, Image, NetInfo, Alert } from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Geocoder from "react-native-geocoder";
import { graphRequest } from "../../lib/graphRequest";
import Button from "../../components/basicButton";
import BackButton from "../../components/backButton";
import RidePoints from "./RidePoints";
import RideStart from "./RideStart";
import StartPosSelect from "./StartPosSelect";
import FinishPosSelect from "./FinishPosSelect";
import { regionFrom } from "../../lib/delta";
import { rideNav } from "../../actions/ride_nav";
import { connectionState } from "../../actions/connection_state";
import { saveRideDistance } from "../../actions/ride_distance";
import { cleanStart, cleanFinish } from "../../actions/ride_position";
import { cleanPolyCoords } from "../../actions/clean_poly_coords";
import { saveDriver } from "../../actions/save_driver";
import { showIcons } from "../../actions/show_icons";
import { setStart, setFinish } from "../../actions/ride_position";
import { calqDistance } from "../../lib/calqDistance";
import Driver from "../../components/driver";
import RidePickup from "../RidePickup";
import styles from "../styles";

class Map extends React.Component {
  state = {
    screenPos: null,
    drivers: []
  };

  componentDidMount() {
    this.getDrivers();
    // primer chequeo de conexion a internet
    NetInfo.isConnected.fetch().then(isConnected => {
      this.handleConnection(isConnected);
    });
    // chequeos siguientes
    NetInfo.isConnected.addEventListener("connectionChange", this.handleConnection);
  }

  componentWillUnmount() {
    // remueve el timer que actualiza los drivers y la distancia entre el driver y el cliente
    clearTimeout(this.timer);
    clearTimeout(this.rideDistanceTimer);
    NetInfo.isConnected.removeEventListener("connectionChange", this.handleConnection);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.rideState === "ride_select" &&
      this.props.store.rideStart != null &&
      this.props.store.rideFinish != null
    ) {
      // hace un fit del mapa para que quepa en la pantalla
      this.mapRef.fitToCoordinates(
        [this.props.store.rideStart.coords, this.props.store.rideFinish.coords],
        {
          edgePadding: {
            top: 50,
            left: 100,
            bottom: 300,
            right: 100
          },
          animated: true
        }
      );
    }
  }

  handleConnection = isConnected => {
    // cambiar el estado de la app de connected
    this.props.connectionState(isConnected);
    if (isConnected.type === "none") {
      if (
        this.props.rideState === "waiting_for_driver" ||
        this.props.rideState === "searching_driver" ||
        this.props.rideState === "on_trip"
      ) {
        Alert.alert(
          "Ride Canceled",
          "Your internet connection failed, so your ride had to be canceled"
        );
      } else {
        Alert.alert(
          "No Internet Connection Detected",
          "Please make sure you are connected to the internet"
        );
      }
    }
  };

  getDriver = async () => {
    // se usa el driver id del store para hacer una peticion a la bd cada 3 seg
    // el array de autos se convierte en 1 solo auto.
    // hay que cambiar this.state.drivers, se actualiza la pos del mapa con la del auto
    // siempre y cuando no se haya seleccionado la opcion "dejar de seguir"
    const query = {
      query:
        "query($id: String!) { getDriverPos(id: $id){ driverId socketId coordinate{ coordinates } }}",
      variables: {
        id: this.props.store.driver._id
      }
    };

    if (this.props.connected) {
      let driver = await graphRequest(query);
      if (driver != null && driver.data.data.getDriverPos) {
        driver = driver.data.data.getDriverPos;
        driver = [
          {
            key: driver.driverId,
            position: {
              latitude: driver.coordinate.coordinates[1],
              longitude: driver.coordinate.coordinates[0]
            }
          }
        ];
        this.setState({
          drivers: driver
        });
        // acerca el mapa para que muestre al driver y la posicion de inicio del viaje
        if (
          this.props.store.rideStart != null &&
          this.props.store.rideStart.hasOwnProperty("coords") &&
          this.props.rideState === "waiting_for_driver"
        ) {
          this.mapRef.fitToCoordinates(
            [this.props.store.rideStart.coords, driver[0].position],
            {
              edgePadding: {
                top: 150,
                left: 100,
                bottom: 400,
                right: 100
              },
              animated: true
            }
          );
        }
      }
    } else {
      // internet connection failed, cancel ride
      this.closeRideSelect();
    }
  };

  getClosestDrivers = async () => {
    /** 
     * hace una peticion get al servidor para que le envie un array con todos los conductores activos
     * cada objeto del array(conductor) tiene 2 atributos: position(latitude y longitude) y un key
     * revisar que hayan datos antes de cambiar el estado
     */
    const query = {
      query:
        "query($clientPos: DriverLocationInput!) { getClosestDrivers(clientPos: $clientPos){ driverId coordinate{ coordinates } } }",
      variables: {
        clientPos: {
          longitude: this.props.position.longitude,
          latitude: this.props.position.latitude
        }
      }
    };
    //Revisar bien que haya internet
    if (this.props.connected) {
      let drivers = await graphRequest(query);
      if (
        drivers != null &&
        drivers.data.data.hasOwnProperty("getClosestDrivers")
      ) {
        drivers = drivers.data.data.getClosestDrivers.map(driver => {
          return {
            key: driver.driverId,
            position: {
              latitude: driver.coordinate.coordinates[1],
              longitude: driver.coordinate.coordinates[0]
            }
          };
        });
        this.setState({ drivers });
      }
    }
  };

  getDistance = async (rideStart, rideFinish) => {
    const ride = await calqDistance(rideStart, rideFinish);
    if (ride.status !== "OVER_QUERY_LIMIT") {
      this.props.saveRideDistance(ride.duration);
    } else {
      //console.log("Se ha superado la cantidad maxima de solicitudes diarias a Google");
    }
  };

  getDrivers = () => {
    // actualiza los datos de los conductores desde el servidor cada 3 segundos
    this.timer = setInterval(() => {
      // revisamos si el objeto del conductor tiene propiedades
      if (
        Object.keys(this.props.store.driver).length > 0 &&
        this.props.connected === true
      ) {
        this.getDriver();
      } else if (this.props.connected === true) {
        // si no las tiene es porque no hay un conductor asignado todavia
        this.getClosestDrivers();
      }

      // se hace un zoom al vehiculo del conductor si es que el estado del viaje es on_trip
      if (this.props.rideState === "on_trip") {
        this.mapRef.animateToCoordinate(this.state.drivers[0].position, 3000);
      }

      /**
       * si el usuario pierde su conexion a internet durante alguno de los siguientes estados
       * la app cancela el viaje
       */
      if (
        this.props.connected === false &&
        (this.props.rideState === "waiting_for_driver" ||
          this.props.rideState === "searching_driver" ||
          this.props.rideState === "on_trip")
      ) {
        this.closeRideSelect();
      }
    }, 3000);
    // actualiza la distancia entre el punto de inicio y el conductor (ej: 8 mins)
    this.rideDistanceTimer = setInterval(() => {
      if (
        Object.keys(this.props.store.driver).length > 0 &&
        this.state.drivers.length > 0 &&
        this.props.store.rideStart != null &&
        this.props.store.rideStart.hasOwnProperty("coords") &&
        this.props.rideState === "waiting_for_driver" &&
        this.props.connected === true
      ) {
        this.getDistance(
          this.props.store.rideStart.coords,
          this.state.drivers[0].position
        );
      }
    }, 5000);
  };

  screenMoved = pos => {
    /** 
     * se ejecuta cuando se mueve el mapa. pos guarda un objeto con latitud y longitud
     * que se refiere al centro de la pantalla
     * si se esta seleccionando un punto de inicio o fin de viaje, se guarda esta posicion en el estado
     */
    if (
      this.props.rideState === "start_pos_select" ||
      this.props.rideState === "finish_pos_select"
    ) {
      this.setState({
        screenPos: {
          latitude: pos.latitude,
          longitude: pos.longitude
        }
      });
    }
  };

  setPickupLocation = () => {
    // muestra el icono de startPos del viaje en el mapa y cambia a la pantalla de elegir el segundo punto
    const { screenPos } = this.state;
    if (screenPos != null && this.props.connected) {
      Geocoder.fallbackToGoogle("AIzaSyD_FEHOrO24D__vLp9OeW2e5x6dK4w0l2s");
      Geocoder.geocodePosition({
        lat: screenPos.latitude,
        lng: screenPos.longitude
      }).then(res => {
        const startPos = {
          name: res[0].formattedAddress,
          coords: {
            latitude: screenPos.latitude,
            longitude: screenPos.longitude
          }
        };
        this.props.setStart(startPos);
        this.props.rideNav("finish_pos_select");
      });
    }
  };

  setDropoffLocation = () => {
    // guarda el segundo punto en el store y navega hasta la pantalla que muestra el viaje y los datos
    const { screenPos } = this.state;
    if (screenPos != null && this.props.connected) {
      Geocoder.geocodePosition({
        lat: screenPos.latitude,
        lng: screenPos.longitude
      }).then(res => {
        const finishPos = {
          name: res[0].formattedAddress,
          coords: {
            latitude: screenPos.latitude,
            longitude: screenPos.longitude
          }
        };
        this.props.setFinish(finishPos);
        this.props.rideNav("ride_select");
      });
    }
  };

  closeRideSelect = () => {
    this.props.rideNav("hidden");
    this.props.showIcons(true);
    this.props.cleanStart();
    this.props.cleanFinish();
    this.props.cleanPolyCoords();
    this.props.saveDriver({});
  };

  render() {
    let line = null;
    if (this.props.polyCoords != null && this.props.polyCoords.length > 0) {
      line = (
        <MapView.Polyline
          coordinates={this.props.polyCoords}
          strokeWidth={5}
          strokeColor="#49d1b1"
          lineCap="round"
          lineJoin="round"
        />
      );
    }

    // panel de seleccion de puntos en el mapa
    let nav = null;

    switch (this.props.rideState) {
      case "start_pos_select":
        nav = (
          <StartPosSelect
            setPickupLocation={this.setPickupLocation}
            close={this.closeRideSelect}
          />
        );
        break;
      case "finish_pos_select":
        nav = (
          <FinishPosSelect
            setDropoffLocation={this.setDropoffLocation}
            close={this.closeRideSelect}
          />
        );
        break;
    }

    return (
      <View style={styles.map} pointerEvents="box-none">
        <MapView
          style={styles.map}
          initialRegion={regionFrom(
            this.props.position.latitude,
            this.props.position.longitude,
            50
          )}
          showsCompass={false}
          toolbarEnable={false}
          rotateEnabled={false}
          pitchEnabled={false}
          showsUserLocation={true}
          showsMyLocationButton={false}
          onRegionChange={pos => this.screenMoved(pos)}
          //provider={"google"}
          ref={ref => {
            this.mapRef = ref;
          }}
        >
          {this.state.drivers.map(driver => (
            <Driver key={driver.key} coordinate={driver.position} />
          ))}
          <RidePoints
            rideStart={this.props.store.rideStart}
            rideFinish={this.props.store.rideFinish}
            rideState={this.props.rideState}
          />
          <RideStart
            pos={this.props.store.rideStart}
            rideState={this.props.rideState}
          />
          <RidePickup
            show={this.props.rideState === "waiting_for_driver"}
            coordinate={this.props.store.rideStart}
            distance={this.props.store.distance}
          />
          {line}
        </MapView>
        {nav}
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    store: state,
    rideState: state.rideNav,
    polyCoords: state.polyCoords,
    connected: state.connected
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setStart,
      setFinish,
      rideNav,
      saveRideDistance,
      connectionState,
      showIcons,
      cleanStart,
      cleanFinish,
      saveDriver,
      cleanPolyCoords
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
