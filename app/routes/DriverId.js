import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StarRating from "react-native-star-rating";
import call from "react-native-phone-call";
import Button from "../components/basicButton";
import { hideRideNav } from "../actions/hide_ride_nav";
import { showIcons } from "../actions/show_icons";
import { cleanStart } from "../actions/ride_position";
import { saveDriver } from "../actions/save_driver";
import styles from "./styles";

class DriverId extends React.Component {
  static propTypes = {
    driver: PropTypes.object.isRequired,
    distance: PropTypes.number.isRequired
  };
  static defaultProps = { driver: {}, distance: 0 };

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
  render() {
    const { driver } = this.props;
    return (
      <View style={styles.driverId}>
        <View style={styles.rideStatus}>
          <Text>
            En Route: Your driver will arrive in {this.props.distance} mins
          </Text>
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
          <Button
            style={styles.pickupBtn}
            text="Cancel"
            btnStyle="inline"
            onTouch={this.cancelRide}
          />
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
