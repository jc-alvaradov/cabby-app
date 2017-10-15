import React from "react";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { rideNav } from "../actions/ride_nav";
import { hideRideNav } from "../actions/hide_ride_nav";
import { cleanStart, cleanFinish } from "../actions/ride_position";
import { showIcons } from "../actions/show_icons";
import { cleanPolyCoords } from "../actions/clean_poly_coords";
import SearchDriver from "./searchDriver";
import Loading from "../components/loading";
import Button from "../components/basicButton";
import BackButton from "../components/backButton";
import styles from "./styles";

class DriverId extends React.Component {
  render() {
    return (
      <View style={styles.driverId}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={{ uri: this.props.driver.photo }}
        />
        <Text>{this.props.driver.driverName}</Text>
        <Text>{this.props.driver.carModel}</Text>
      </View>
    );
  }
}

class RideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      price: 0,
      rideShown: false
    };
    this.closeRideSelect = this.closeRideSelect.bind(this);
    this.closeSearchDriver = this.closeSearchDriver.bind(this);
    this.calqDistance = this.calqDistance.bind(this);
    this.requestTaxi = this.requestTaxi.bind(this);
  }

  closeRideSelect() {
    this.props.hideRideNav("hidden");
    this.props.showIcons(true);
    this.props.cleanStart();
    this.props.cleanFinish();
    this.props.cleanPolyCoords();
    this.setState({ rideShown: false });
  }

  closeSearchDriver() {
    this.setState({ rideShown: false });
  }

  addCommas(n) {
    // añade puntos al precio
    var rx = /(\d+)(\d{3})/;
    return String(n).replace(/^\d+/, function(w) {
      while (rx.test(w)) {
        w = w.replace(rx, "$1.$2");
      }
      return w;
    });
  }

  async calqDistance() {
    if (this.props.rideStart != null && this.props.rideFinish != null) {
      const rideStart = this.props.rideStart.coords;
      const rideFinish = this.props.rideFinish.coords;
      const query = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${rideStart.latitude},${rideStart.longitude}&destinations=${rideFinish.latitude},${rideFinish.longitude}&key=AIzaSyAJTjCs9OddMqnuyL6qXowI8SYQTwU5vjQ`;
      let resp = await fetch(query);
      let respJson = await resp.json();

      if (!respJson.hasOwnProperty("error_message")) {
        const ride = respJson.rows[0].elements[0];
        const ridePrice = Math.round(ride.distance.value / 1000 * 400);
        this.setState({
          distance: ride.distance.text,
          price: ridePrice > 999 ? this.addCommas(ridePrice) : ridePrice,
          rideShown: true
        });
      } else {
        console.log(
          "Hubo un error en la peticion a la api de google: " +
            respJson.error_message
        );
      }
    }
  }

  requestTaxi() {
    // hace que se muestre la pantalla de "buscando conductor" encima del mapa
    this.props.rideNav("searching_driver");
    this.closeSearchDriver();
  }

  render() {
    // dependiendo de los valores del store se muestran distintos componentes
    let nav;
    switch (this.props.state) {
      case "ride_select":
        if (!this.state.rideShown) {
          this.calqDistance();
        }
        nav = (
          <View style={styles.rideSelectContainer} pointerEvents="box-none">
            <BackButton onTouch={this.closeRideSelect} />
            <View style={styles.textContainer}>
              <Text style={styles.estimation}>
                Estimated {this.state.distance}
              </Text>
              <Text style={styles.price}>${this.state.price}</Text>
            </View>
            <View>
              <Button
                style={styles.pickupBtn}
                text="Request Taxi"
                btnStyle="long"
                onTouch={this.requestTaxi}
              />
            </View>
          </View>
        );
        break;
      case "searching_driver":
        nav = (
          <SearchDriver
            rideStart={this.props.rideStart}
            rideFinish={this.props.rideFinish}
            amount={this.state.price}
            user={this.props.user}
          />
        );
        break;
      case "driver_id":
        nav = <DriverId driver={this.props.driver} />;
        break;
      case "hidden":
        nav = null;
        break;
      default:
        nav = null;
    }
    return nav;
  }
}

function mapStateToProps(state) {
  return {
    state: state.rideNav,
    user: state.user,
    driver: state.driver,
    rideStart: state.rideStart,
    rideFinish: state.rideFinish
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      rideNav,
      hideRideNav,
      showIcons,
      cleanStart,
      cleanFinish,
      cleanPolyCoords
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RideNav);
