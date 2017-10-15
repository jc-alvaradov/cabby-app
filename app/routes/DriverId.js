import React, { PropTypes } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StarRating from "react-native-star-rating";
import call from "react-native-phone-call";
import Button from "../components/basicButton";
import { hideRideNav } from "../actions/hide_ride_nav";
import { showIcons } from "../actions/show_icons";
import { saveDriver } from "../actions/save_driver";
import styles from "./styles";

const propTypes = {
  driver: PropTypes.object.isRequired
};

const defaultProps = {
  driver: {}
};

class DriverId extends React.Component {
  constructor(props) {
    super(props);
    this.cancelRide = this.cancelRide.bind(this);
  }

  cancelRide() {
    this.props.hideRideNav("hidden");
    this.props.showIcons(true);
    this.props.saveDriver({});
  }

  callDriver(number) {
    const args = {
      number,
      prompt: true
    };
    call(args).catch(console.error);
  }
  render() {
    const { driver } = this.props;
    return (
      <View style={styles.driverId}>
        <View style={styles.rideStatus}>
          <Text>En Route: Your driver will arrive in 8 mins</Text>
        </View>
        <View style={styles.driverContainer}>
          <View>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginTop: 8,
                marginBottom: 4
              }}
              source={{ uri: driver.photo }}
            />
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
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderColor: "#d1d1d1",
            borderTopWidth: 0.3
          }}
        >
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

DriverId.propTypes = propTypes;
DriverId.defaultProps = defaultProps;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      hideRideNav,
      showIcons,
      saveDriver
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(DriverId);
