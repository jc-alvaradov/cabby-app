import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StarRating from "react-native-star-rating";
import call from "react-native-phone-call";
import Button from "../components/basicButton";
import { hideRideNav } from "../actions/hide_ride_nav";
import { rideNav } from "../actions/ride_nav";
import { showIcons } from "../actions/show_icons";
import { cleanStart } from "../actions/ride_position";
import { saveDriver } from "../actions/save_driver";
import styles from "./styles";

class DriverId extends React.Component {
  static propTypes = {
    driver: PropTypes.object.isRequired,
    distance: PropTypes.object.isRequired
  };
  static defaultProps = { driver: {}, distance: { text: "0 min" } };

  cancelRide = () => {
    this.props.cleanStart();
    this.props.hideRideNav("hidden");
    this.props.showIcons(true);
    this.props.saveDriver({});
  };

  callDriver = number => {
    const args = {
      number,
      prompt: true
    };
    call(args).catch(console.error);
  };

  componentDidMount() {
    const { socket } = this.props;
    socket.on("CONFIRM_PICKUP", () => {
      // recogieron al usuario
      this.props.rideNav("on_trip");
    });
  }

  render() {
    const { driver } = this.props;
    const { text, value } = this.props.distance;
    const distance = parseInt(text);
    let message;
    // ugly if else chain, but its faster than a switch statement
    if (value <= 15) {
      // aqui usamos value ya que es mas preciso para menos de un minuto, el distance.text lo redondea siempre hasta 1 min
      message = "Arrived: Please go meet your driver";
    } else if (distance >= 1 && distance < 5) {
      // aqui usamos text porque tiene formato, ej: 14 mins
      message = `Arriving: Your driver will arrive in ${text}`;
    } else if (distance >= 5 && distance < 10) {
      message = `En Route: Your driver will arrive in ${text}`;
    } else {
      message = `En Route: Your driver will arrive in ${text}`;
    }

    let cancelBtn =
      value <= 15 ? null : (
        <Button
          style={styles.pickupBtn}
          text="Cancel"
          btnStyle="inline"
          onTouch={this.cancelRide}
        />
      );

    return (
      <View style={styles.driverId}>
        <View style={styles.rideStatus}>
          <Text>{message}</Text>
        </View>
        <View style={styles.driverContainer}>
          <View>
            <Image style={styles.driverPhoto} source={{ uri: driver.photo }} />
            <StarRating
              disabled={true}
              maxStars={5}
              starColor="#444444"
              starSize={14}
              rating={driver.rating}
            />
          </View>
          <View style={styles.driverInfo}>
            <Text style={styles.bold}>{driver.driverName}</Text>
            <Text>{driver.carModel}</Text>
            <Text style={styles.carPlate}>{driver.carPlate}</Text>
          </View>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={{ uri: driver.carPhoto }}
          />
        </View>
        <View style={styles.rideBtn}>
          {cancelBtn}
          <Button
            style={styles.pickupBtn}
            text="Call"
            icon="phone"
            btnStyle="inline"
            onTouch={() => this.callDriver(driver.phone)}
          />
        </View>
      </View>
    );
  }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      hideRideNav,
      showIcons,
      saveDriver,
      cleanStart
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(DriverId);
