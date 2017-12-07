import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { rideNav } from "../actions/ride_nav";
import styles from "./styles";

class OnTrip extends React.Component {
  componentDidMount() {
    const { socket } = this.props;
    socket.on("FINISH_RIDE", () => {
      // termino el viaje
      this.props.rideNav("payment");
    });
  }
  render() {
    // quizas el mapa podria ir siguiendo la posicion del cliente en el mapa
    return (
      <View style={styles.rideApp} pointerEvents="box-none">
        <View style={styles.headerTitle}>
          <Text style={styles.rideStatus}>On Trip</Text>
          <Text>Your are on your way to your destination</Text>
        </View>
        <View style={styles.onTrip}>
          <Text style={styles.onTripTitle}>
            <Icon name="circle-o" color="#1ca68a" />
            {"  "}From
          </Text>
          <Text style={styles.place} numberOfLines={1}>
            {this.props.rideStart.name}
          </Text>
          <Text style={styles.onTripTitle}>
            <Icon name="circle" color="#1ca68a" />
            {"  "}To
          </Text>
          <Text style={styles.place} numberOfLines={1}>
            {this.props.rideFinish.name}
          </Text>
        </View>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    payment: state.payment
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      rideNav
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(OnTrip);
