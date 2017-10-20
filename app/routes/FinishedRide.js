import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StarRating from "react-native-star-rating";
import Button from "../components/basicButton";
import { hideRideNav } from "../actions/hide_ride_nav";
import { showIcons } from "../actions/show_icons";
import styles from "./styles";

class FinishedRide extends React.Component {
  static propTypes = {
    driver: PropTypes.object.isRequired
  };
  static defaultProps = { driver: {} };

  state = {
    starCount: 0
  };

  rateRide = rating => {
    // despachar accion que le da nota al driver
    this.setState({ starCount: rating });
  };

  finishAndRate = () => {
    console.log("Vamo a darle nota al driver!: " + this.state.starCount);
    // aqui tenemos que limpiar todo el estado referente a el ride,
    // tenemos que guardar en la base de datos una foto del ride completo
  };

  cancelRide = () => {
    // se devuelve al menu principal
    this.props.hideRideNav("hidden");
    this.props.showIcons(true);
  };

  render() {
    const { driver } = this.props;

    return (
      <View style={styles.driverId}>
        <View style={styles.driverContainer}>
          <View style={styles.driverInfo}>
            <Image style={styles.driverPhoto} source={{ uri: driver.photo }} />
            <Text style={styles.bold}>{driver.driverName}</Text>
            <Text style={styles.carPlate}>{driver.carPlate}</Text>
          </View>
          <View>
            <Text>$5.321</Text>
          </View>
        </View>
        <View>
          <StarRating
            maxStars={5}
            starColor="#444444"
            rating={this.state.starCount}
            selectedStar={rating => this.rateRide(rating)}
          />
        </View>
        <View style={styles.rideBtn}>
          <Button
            style={styles.pickupBtn}
            text="Cancel"
            btnStyle="inline"
            onTouch={() => this.cancel()}
          />
          <Button
            style={styles.pickupBtn}
            text="Rate Ride"
            btnStyle="inline"
            onTouch={() => this.finishAndRate()}
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
      showIcons
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(FinishedRide);
