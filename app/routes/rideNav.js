import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { rideNav } from "../actions/ride_nav";
import { hideRideNav } from "../actions/hide_ride_nav";
import { cleanStart, cleanFinish } from "../actions/ride_position";
import { showIcons } from "../actions/show_icons";
import { cleanPolyCoords } from "../actions/clean_poly_coords";
import SearchDriver from "./searchDriver";
import DriverId from "./DriverId";
import Loading from "../components/loading";
import Button from "../components/basicButton";
import BackButton from "../components/backButton";
import { addCommas } from "../lib/addCommas";
import { calqDistance } from "../lib/calqDistance";
import styles from "./styles";

class RideNav extends React.Component {
  state = {
    distance: 0,
    price: 0,
    rideShown: false
  };

  closeRideSelect = () => {
    this.props.hideRideNav("hidden");
    this.props.showIcons(true);
    this.props.cleanStart();
    this.props.cleanFinish();
    this.props.cleanPolyCoords();
    this.setState({ rideShown: false });
  };

  closeSearchDriver = () => {
    this.setState({ rideShown: false });
  };

  requestTaxi = () => {
    // hace que se muestre la pantalla de "buscando conductor" encima del mapa
    this.props.rideNav("searching_driver");
    this.closeSearchDriver();
  };

  getRide = async (rideStart, rideFinish) => {
    const ride = await calqDistance(rideStart, rideFinish);
    const ridePrice = Math.round(ride.distance.value / 1000 * 400);
    this.setState({
      distance: ride.distance.text,
      price: ridePrice > 999 ? addCommas(ridePrice) : ridePrice,
      rideShown: true
    });
  };

  render() {
    // dependiendo de los valores del store se muestran distintos componentes
    let nav;
    const { rideStart, rideFinish } = this.props;
    switch (this.props.state) {
      case "ride_select":
        if (!this.state.rideShown && rideStart != null && rideFinish != null) {
          this.getRide(rideStart.coords, rideFinish.coords);
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
            rideStart={rideStart}
            rideFinish={rideFinish}
            amount={this.state.price}
            user={this.props.user}
          />
        );
        break;
      case "driver_id":
        nav = (
          <DriverId driver={this.props.driver} distance={this.props.distance} />
        );
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
    distance: state.distance,
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
