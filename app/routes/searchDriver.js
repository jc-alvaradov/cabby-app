import React from "react";
import { Text, View } from "react-native";
import SocketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { graphRequest } from "../lib/graphRequest";
import { rideNav } from "../actions/ride_nav";
import { saveDriver } from "../actions/save_driver";
import { cleanPolyCoords } from "../actions/clean_poly_coords";
import { cleanStart, cleanFinish } from "../actions/ride_position";
import styles from "./styles";

class SearchDriver extends React.Component {
  componentDidMount() {
    const socket = SocketIOClient("http://45.7.229.110:3000");
    const { rideStart, rideFinish, amount, user } = this.props;

    const client = {
      rideStart,
      rideFinish,
      amount,
      clientName: user.name
    };

    socket.emit("SEARCH_DRIVER", client);
    socket.on("DRIVER_FOUND", driverId => {
      //buscamos los datos del conductor usando su id
      this.getDriver(driverId);
    });
    socket.on("DRIVER_NOT_FOUND", () => {
      // no se pudo encontrar un conductor, le mandamos un mensaje de error al usuario
      console.log("No se pudo encontrar un conductor :c");
    });
  }

  getDriver = async driverId => {
    const query = {
      query:
        "query($id: String!) { getDriverById(id: $id){ _id driverName phone email earnings payment rating photo carPlate carModel carColor carPhoto active }}",
      variables: {
        id: driverId
      }
    };

    let driver = await graphRequest(query);
    driver = driver.data.data.getDriverById;
    if (driver != null) {
      // guardamos al driver en el estado de redux para poder usarlo en otras partes
      // de la app.
      this.props.saveDriver(driver);
      // limpiamos los props anteriores de rideStart, rideFinish, etc
      this.props.rideNav("driver_id");
      this.props.cleanStart();
      this.props.cleanFinish();
      this.props.cleanPolyCoords();
    }
  };

  render() {
    return (
      <View style={styles.driverSearch}>
        <Text>Searching for Driver ...</Text>
        <Text>Client Name: {this.props.user.name}</Text>
        <Text>From {this.props.rideStart.name}</Text>
        <Text>To {this.props.rideFinish.name}</Text>
      </View>
    );
  }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      rideNav,
      saveDriver,
      cleanStart,
      cleanFinish,
      cleanPolyCoords
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(SearchDriver);
