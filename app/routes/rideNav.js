import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SocketIOClient from "socket.io-client";
import { rideNav } from "../actions/ride_nav";
import { cleanStart, cleanFinish } from "../actions/ride_position";
import { showIcons } from "../actions/show_icons";
import { cleanPolyCoords } from "../actions/clean_poly_coords";
import SearchDriver from "./searchDriver";
import DriverId from "./DriverId";
import OnTrip from "./OnTrip";
import FinishedRide from "./FinishedRide";
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
    time: "",
    rideShown: false,
    socket: null
  };

  componentDidMount() {
    const socket = SocketIOClient("http://45.7.229.110:3000");
    this.setState({ socket });
  }

  render() {
    // dependiendo de los valores del store se muestran distintos componentes
    let nav;
    const { rideStart, rideFinish } = this.props;
    switch (this.props.state) {
      case "ride_select":
        if (!this.state.rideShown && rideStart != null && rideFinish != null) {
          this.getRide(rideStart.coords, rideFinish.coords);
        }
        if (this.state.price == 0) {
          nav = (
            <View style={styles.loadingBackground}>
              <Loading />
            </View>
          );
        } else {
          nav = (
            <View style={styles.rideSelectContainer} pointerEvents="box-none">
              <BackButton onTouch={this.closeRideSelect} />
              <View style={styles.textContainer}>
                <View style={styles.estimations}>
                  <Text style={styles.estimation}>
                    Estimated {this.state.distance}
                  </Text>
                  <Text style={styles.estimation}>{this.state.time}</Text>
                </View>
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
        }
        break;
      case "searching_driver":
        nav = (
          <SearchDriver
            rideStart={rideStart}
            rideFinish={rideFinish}
            amount={this.state.price}
            user={this.props.user}
            socket={this.state.socket}
          />
        );
        break;
      case "waiting_for_driver":
        nav = (
          <DriverId
            driver={this.props.driver}
            distance={this.props.distance}
            socket={this.state.socket}
          />
        );
        break;
      case "on_trip":
        nav = (
          <OnTrip
            driver={this.props.driver}
            rideStart={rideStart}
            rideFinish={rideFinish}
            socket={this.state.socket}
          />
        );
        break;
      case "ride_finished":
        nav = <FinishedRide driver={this.props.driver} />;
        break;
      default:
        nav = null;
    }
    return nav;
  }

  closeRideSelect = () => {
    this.props.cleanStart();
    this.props.cleanFinish();
    this.props.showIcons(true);
    this.props.cleanPolyCoords();
    this.setState({ rideShown: false });
    this.props.rideNav("hidden");
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
    if (ride.status !== "OVER_QUERY_LIMIT") {
      const ridePrice = Math.round(ride.distance.value / 1000 * 400);
      this.setState({
        distance: ride.distance.text,
        price: ridePrice > 999 ? addCommas(ridePrice) : ridePrice,
        time: ride.duration.text,
        rideShown: true
      });
    } else {
      //console.log("Se ha superado la cantidad maxima de solicitudes diarias a Google");
    }
  };
}

mapStateToProps = state => {
  return {
    state: state.rideNav,
    user: state.user,
    driver: state.driver,
    distance: state.distance,
    rideStart: state.rideStart,
    rideFinish: state.rideFinish
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      rideNav,
      showIcons,
      cleanStart,
      cleanFinish,
      cleanPolyCoords
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RideNav);
