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
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoder";
import Polyline from "@mapbox/polyline";
import HeaderButton from "../../components/headerButton";
import AutoCompleteInput from "../../components/autoCompleteInput";
import RideNav from "../rideNav";
import Map from "./map";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polyCoords: []
    };
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

  async getDirections() {
    const startLoc = this.props.store.rideStart;
    const destinationLoc = this.props.store.rideFinish;

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
      this.setState({ polyCoords: coords });
      //return coords;
    } catch (error) {
      return error;
    }
  }

  componentDidMount() {
    this.getDirections();
    /*this.makeDirections(this.props.position, {
      latitude: -33.047238,
      longitude: -71.61268849999999
    });*/
  }

  render() {
    // Solo se debiera poder hacer click una vez en el router

    if (this.props.store.rideNav == "ride_select") {
      console.log("Hay un ride select!");
      this.getDirections();
    }

    return (
      <View style={styles.container}>
        <Map
          position={this.props.position}
          cars={this.props.cars}
          clientImg={this.props.clientImg}
          polyCoords={this.state.polyCoords}
        />
        <HeaderButton
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
          show={this.props.store.showIcons}
        />
        <View style={styles.searchView}>
          <AutoCompleteInput
            defaultValue="Where do you want to go?"
            callBack={this.routerNav}
            show={this.props.store.showIcons}
          />
        </View>
        <RideNav state={this.props.store.rideNav} />
      </View>
    );
  }
}

Home.navigationOptions = {
  header: null
};

function mapStateToProps(state) {
  return {
    store: state
  };
}

export default connect(mapStateToProps)(Home);

/*


            <Icon style={styles.icon} name="search" />

*/
