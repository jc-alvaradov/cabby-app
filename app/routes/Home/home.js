import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoder";
import Polyline from "@mapbox/polyline";
import HeaderButton from "../../components/headerButton";
import AutoCompleteInput from "../../components/autoCompleteInput";
import { setPolyCoords } from "../../actions/set_polyCoords";
import RideNav from "../rideNav";
import Map from "./map";

class Home extends Component {
  constructor(props) {
    super(props);
    this.routerNav = this.routerNav.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }

  routerNav(ciudad) {
    Geocoder.geocodePosition({
      lat: this.props.position.latitude,
      lng: this.props.position.longitude
    }).then(res => {
      this.props.navigation.navigate("Router", {
        ciudad,
        userPos: `${res[0].streetName} ${res[0].streetNumber}, ${res[0]
          .locality}, ${res[0].subAdminArea}`
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.rideNav === "ride_select" &&
      nextProps.rideStart != null &&
      nextProps.rideFinish != null
    ) {
      const startLoc =
        nextProps.rideStart.coords.latitude +
        "," +
        nextProps.rideStart.coords.longitude;
      const destinationLoc =
        nextProps.rideFinish.coords.latitude +
        "," +
        nextProps.rideFinish.coords.longitude;
      this.getDirections(startLoc, destinationLoc);
    }
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyAJTjCs9OddMqnuyL6qXowI8SYQTwU5vjQ`
      );
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.props.setPolyCoords(coords);
      return coords;
    } catch (error) {
      return error;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Map position={this.props.position} />
        <HeaderButton
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
          show={this.props.showIcons}
        />
        <View style={styles.searchView}>
          <AutoCompleteInput
            defaultValue="Where do you want to go?"
            callBack={this.routerNav}
            show={this.props.showIcons}
          />
        </View>
        <RideNav />
      </View>
    );
  }
}

Home.navigationOptions = {
  header: null
};

function mapStateToProps(state) {
  return {
    showIcons: state.showIcons,
    rideNav: state.rideNav,
    rideStart: state.rideStart,
    rideFinish: state.rideFinish
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setPolyCoords }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/*


            <Icon style={styles.icon} name="search" />

*/
