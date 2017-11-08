import React from "react";
import { Text, View, Alert } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { graphRequest } from "../lib/graphRequest";
import Loading from "../components/loading";
import { rideNav } from "../actions/ride_nav";
import { saveDriver } from "../actions/save_driver";
import { showIcons } from "../actions/show_icons";
import { cleanPolyCoords } from "../actions/clean_poly_coords";
import { cleanStart, cleanFinish } from "../actions/ride_position";
import { calqDistance } from "../lib/calqDistance";
import { saveRideDistance } from "../actions/ride_distance";
import styles from "./styles";

class SearchDriver extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    rideStart: PropTypes.object.isRequired,
    rideFinish: PropTypes.object.isRequired,
    amount: PropTypes.string.isRequired
  };

  static defaultProps = {
    user: { name: "" },
    rideStart: { name: "" },
    rideFinish: { name: "" },
    amount: "0"
  };

  componentDidMount() {
    const { rideStart, rideFinish, amount, user, socket } = this.props;
    const client = {
      rideStart,
      rideFinish,
      amount,
      clientName: user.name
    };

    socket.emit("SEARCH_DRIVER", client);
    socket.on("DRIVER_FOUND", driverPos => {
      //buscamos los datos del conductor usando su id
      this.getDriver(driverPos, rideStart);
    });
    socket.on("DRIVER_NOT_FOUND", () => {
      // no se pudo encontrar un conductor, le mandamos un mensaje de error al usuario
      Alert.alert(
        "No drivers found next to you",
        "Sorry, please try again later",
        [{ text: "Ok", onPress: () => this.close() }],
        { onDismiss: () => this.close() }
      );
    });
  }

  close = () => {
    this.props.rideNav("hidden");
    this.props.showIcons(true);
    this.props.cleanStart();
    this.props.cleanFinish();
    this.props.cleanPolyCoords();
  };

  getDistance = async (rideStart, rideFinish, driver) => {
    // esperamos a obtener la distancia para actualizar la pantalla y mostrar lo demas
    rideFinish = {
      latitude: rideFinish.coordinates[1],
      longitude: rideFinish.coordinates[0]
    };

    if (this.props.connected === true) {
      const ride = await calqDistance(rideStart.coords, rideFinish);
      if (ride.status !== "OVER_QUERY_LIMIT") {
        this.props.saveRideDistance(ride.duration);
        this.props.saveDriver(driver);
        // limpiamos los props anteriores de rideStart, rideFinish, etc
        this.props.rideNav("waiting_for_driver");
        this.props.cleanPolyCoords();
      } else {
        //console.log("Se ha superado la cantidad maxima de solicitudes diarias a Google");
      }
    } else {
      // alert no internet
    }
  };

  getDriver = async (driverPos, rideStart) => {
    const query = {
      query:
        "query($id: String!) { getDriverById(id: $id){ _id driverName phone email earnings payment rating photo carPlate carModel carColor carPhoto active }}",
      variables: {
        id: driverPos.driverId
      }
    };
    if (this.props.connected === true) {
      let driver = await graphRequest(query);
      driver = driver.data.data.getDriverById;
      if (driver != null) {
        // guardamos al driver en el estado de redux para poder usarlo en otras partes
        // de la app.
        // aqui recibimos la posicion actual del driver y calculamos la distancia con el rideStart
        this.getDistance(rideStart, driverPos.coordinate, driver);
      }
    } else {
      // alert, no internet connection
    }
  };

  render() {
    return (
      <View style={styles.driverSearch}>
        <View style={styles.headerTitle}>
          <Text style={styles.rideStatus}>Searching For Driver</Text>
          <Text>Please wait...</Text>
        </View>
        <Loading />
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    connected: state.connected
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      rideNav,
      showIcons,
      saveDriver,
      saveRideDistance,
      cleanStart,
      cleanFinish,
      cleanPolyCoords
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchDriver);
