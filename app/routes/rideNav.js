import React from "react";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideRideNav } from "../actions/hide_ride_nav";
import { cleanStart, cleanFinish } from "../actions/ride_position";
import { showIcons } from "../actions/show_icons";
import { cleanPolyCoords } from "../actions/clean_poly_coords";
import Button from "../components/basicButton";
import BackButton from "../components/backButton";
import Loading from "../components/loading";
import styles from "./styles";

const DriverId = ({ name, avatar }) => {
  return (
    <View style={styles.driverId}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: avatar }}
      />
      <Text>{name}</Text>
      <Text>Suzuki Maruti</Text>
    </View>
  );
};

class RideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      price: 0,
      time: "",
      rideShown: false
    };
    this.closeRideSelect = this.closeRideSelect.bind(this);
    this.calqDistance = this.calqDistance.bind(this);
  }

  closeRideSelect() {
    this.props.hideRideNav("hidden");
    this.props.showIcons(true);
    this.props.cleanStart();
    this.props.cleanFinish();
    this.props.cleanPolyCoords();
    this.setState({ rideShown: false });
  }

  closePosSelect() {
    //navegar hasta el router y pasarle por params los valores
  }

  addCommas(n) {
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
      const rideStart = this.props.rideStart;
      const rideFinish = this.props.rideFinish;
      const query = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${rideStart.latitude},${rideStart.longitude}&destinations=${rideFinish.latitude},${rideFinish.longitude}&key=AIzaSyAJTjCs9OddMqnuyL6qXowI8SYQTwU5vjQ`;
      let resp = await fetch(query);
      let respJson = await resp.json();

      if (!respJson.hasOwnProperty("error_message")) {
        const ride = respJson.rows[0].elements[0];
        // asegurarse de que no sea cero al dividir
        const ridePrice = Math.round(ride.distance.value / 1000 * 400);
        this.setState({
          distance: ride.distance.text,
          time: ride.duration.text,
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

  render() {
    let rideNav;
    switch (this.props.state) {
      case "start_pos_select":
        rideNav = (
          <View>
            <Button
              text="Cancel"
              onTouch={this.closePosSelect}
              btnStyle="small"
            />
          </View>
        );
        break;
      case "finish_pos_select":
        break;
      case "ride_select":
        if (!this.state.rideShown) {
          this.calqDistance();
        }
        rideNav = (
          <View style={styles.rideSelectContainer} pointerEvents="box-none">
            <BackButton onTouch={this.closeRideSelect} />
            <View style={styles.textContainer}>
              <Text style={styles.estimation}>
                Estimated {this.state.distance}
              </Text>
              <Text style={styles.price}>${this.state.price}</Text>
            </View>
            <View>
              <Button text="Request Taxi" btnStyle="long" />
            </View>
          </View>
        );
        break;
      case "searching_driver":
        rideNav = <Loading />;
        break;
      case "driver_id":
        rideNav = (
          <DriverId
            name={this.props.user.name}
            avatar={this.props.user.avatar}
          />
        );
        break;
      case "hidden":
        rideNav = null;
        break;
      default:
        rideNav = null;
    }
    return rideNav;
  }
}

function mapStateToProps(state) {
  return {
    rideStart: state.rideStart,
    rideFinish: state.rideFinish
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { hideRideNav, showIcons, cleanStart, cleanFinish, cleanPolyCoords },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RideNav);
