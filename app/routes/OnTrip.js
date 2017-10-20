import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { rideNav } from "../actions/ride_nav";
import { cleanStart, cleanFinish } from "../actions/ride_position";
import styles from "./styles";

class OnTrip extends React.Component {
  componentDidMount() {
    const { socket } = this.props;
    socket.on("FINISH_RIDE", () => {
      // termino el viaje
      console.log("Termino el viaje! :o");
      this.props.cleanStart();
      this.props.cleanFinish();
      this.props.rideNav("ride_finished");
    });
  }
  render() {
    // quizas el mapa podria ir siguiendo la posicion del cliente en el mapa
    return (
      <View style={styles.driverSearch}>
        <Text>On Trip</Text>
        <Text>From {this.props.rideStart.name}</Text>
        <Text>To {this.props.rideFinish.name}</Text>
      </View>
    );
  }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      rideNav
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(OnTrip);
