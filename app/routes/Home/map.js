import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "../styles";
import { graphRequest } from "../../lib/graphRequest";
import Button from "../../components/basicButton";
import { regionFrom } from "../../lib/delta";
import { rideNav } from "../../actions/ride_nav";
import { setStart, setFinish } from "../../actions/ride_position";
import Driver from "../../components/driver";
import RidePickup from "../RidePickup";

class Map extends React.Component {
  state = {
    screenPos: null,
    showStartIcon: false,
    drivers: []
  };

  componentDidMount() {
    this.getDrivers();
  }

  getDriver = async () => {
    // se usa el driver id del store para hacer una peticion a la bd cada 3 min
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
      /*this.mapRef.fitToCoordinates([this.props.position, driver[0].position], {
        edgePadding: {
          top: 150,
          left: 100,
          bottom: 400,
          right: 100
        },
        animated: true
      });*/
      // agregar condicion si es que el usuario decide no seguir al driver
      /*this.mapRef.animateToRegion(
        regionFrom(
          driver[0].position.latitude,
          driver[0].position.longitude,
          15
        ),
        1000
      );*/
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
    let drivers = await graphRequest(query);
    if (drivers != null && drivers.data.data.getClosestDrivers) {
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
  };

  getDrivers = () => {
    // actualiza los datos de los conductores desde el servidor cada 3 segundos
    this.timer = setInterval(() => {
      // revisamos si el objeto del conductor tiene propiedades
      if (Object.keys(this.props.store.driver).length > 0) {
        this.getDriver();
      } else {
        // si no las tiene es porque no hay un conductor asignado todavia
        this.getClosestDrivers();
      }
    }, 3000);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.rideState === "ride_select") {
      // hace un fit del mapa para que quepa en la pantalla
      this.timer = setTimeout(() => {
        this.mapRef.fitToCoordinates(
          [
            this.props.store.rideStart.coords,
            this.props.store.rideFinish.coords
          ],
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
      }, 1000);
    }
  }

  componentWillUnmount() {
    // remueve el timer que actualiza los drivers
    clearTimeout(this.timer);
  }

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
    if (this.state.screenPos != null) {
      const startPos = {
        name: "",
        coords: {
          latitude: this.state.screenPos.latitude,
          longitude: this.state.screenPos.longitude
        }
      };
      this.props.setStart(startPos);
      this.setState({ showStartIcon: true });
      this.props.rideNav("finish_pos_select");
    }
  };

  setDropoffLocation = () => {
    // guarda el segundo punto en el store y navega hasta la pantalla que muestra el viaje y los datos
    if (this.state.screenPos != null) {
      const finishPos = {
        name: "",
        coords: {
          latitude: this.state.screenPos.latitude,
          longitude: this.state.screenPos.longitude
        }
      };
      this.props.setFinish(finishPos);
      this.setState({ showStartIcon: false });
      this.props.rideNav("ride_select");
    }
  };

  takeSnapshot() {
    const snapshot = this.mapRef.takeSnapshot({
      width: 300, // optional, when omitted the view-width is used
      height: 300, // optional, when omitted the view-height is used
      //region: {..},    // iOS only, optional region to render
      format: "png", // image formats: 'png', 'jpg' (default: 'png')
      quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
      result: "file" // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then(uri => {
      this.setState({ mapSnapshot: uri });
    });
  }

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
          <View style={styles.pinContainer} pointerEvents="box-none">
            <View style={styles.pickupContainer} pointerEvents="none">
              <Image
                style={{ width: 80, height: 80 }}
                source={require("../../images/ride_start.png")}
              />
            </View>
            <View style={styles.pickupBtn}>
              <Button
                text="Set Pickup Location"
                btnStyle="long"
                onTouch={this.setPickupLocation}
              />
            </View>
          </View>
        );
        break;
      case "finish_pos_select":
        nav = (
          <View style={styles.pinContainer} pointerEvents="box-none">
            <View style={styles.pickupContainer} pointerEvents="none">
              <Image
                style={{ width: 80, height: 80 }}
                source={require("../../images/ride_finish.png")}
              />
            </View>
            <View style={styles.pickupBtn}>
              <Button
                text="Set Drop Off Location"
                btnStyle="long"
                onTouch={this.setDropoffLocation}
              />
            </View>
          </View>
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
          provider={"google"}
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
            editing={this.state.editing}
          />
          <RideStart
            pos={this.props.store.rideStart}
            show={this.state.showStartIcon}
          />
          <RidePickup
            show={this.props.rideState === "driver_id"}
            coordinate={this.props.position}
          />
          {line}
        </MapView>
        {nav}
      </View>
    );
  }
}

const RideStart = ({ pos, show }) => {
  let render = null;
  if (pos != null && show == true) {
    return (
      <View>
        <MapView.Marker
          key="rideStartPlanTn"
          coordinate={pos.coords}
          image={require("../../images/ride_start.png")}
        />
      </View>
    );
  }
  return render;
};

const RidePoints = ({ rideStart, rideFinish, editing }) => {
  let render = null;
  if (rideStart != null && rideFinish != null && editing != true) {
    render = (
      <View>
        <MapView.Marker
          key="rideStartKeyTn"
          coordinate={rideStart.coords}
          image={require("../../images/ride_start.png")}
        />
        <MapView.Marker
          key="rideFinishKeyTn"
          coordinate={rideFinish.coords}
          image={require("../../images/ride_finish.png")}
        />
      </View>
    );
  }

  return render;
};

function mapStateToProps(state) {
  return {
    store: state,
    rideState: state.rideNav,
    polyCoords: state.polyCoords
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setStart, setFinish, rideNav }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
