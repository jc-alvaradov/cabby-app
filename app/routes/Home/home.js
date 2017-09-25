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
import { DriverId, RideSelect } from "../ridesNav";
import Map from "./map";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polyCoords: []
    };
    this.routerNav = this.routerNav.bind(this);
  }

  routerNav(ciudad) {
    Geocoder.geocodeAddress(ciudad).then(res => {
      console.log(res[0].position);
    });

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

  makeDirections(startLoc, destLoc) {
    // estos valores debieran leerse desde el store(y guardarse en el formato correcto)
    // esta funcion no es necesaria
    const origin = `${startLoc.latitude}, ${startLoc.longitude}`;
    const dest = `${destLoc.latitude}, ${destLoc.longitude}`;
    this.getDirections(origin, dest);
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
      this.setState({ polyCoords: coords });
      return coords;
    } catch (error) {
      return error;
    }
  }

  componentDidMount() {
    this.makeDirections(this.props.position, {
      latitude: -33.047238,
      longitude: -71.61268849999999
    });
  }

  render() {
    // Solo se debiera poder hacer click una vez en el router
    let rideNav;
    const user = this.props.user;
    switch ("ride_select") {
      case "searching_driver":
        break;
      case "ride_select":
        rideNav = <RideSelect />;
        break;
      case "driver_id":
        rideNav = <DriverId name={user.name} avatar={user.avatar} />;
        break;
      default:
        rideNav = <View />;
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
        />
        <View style={styles.searchView}>
          <AutoCompleteInput
            defaultValue="Where do you want to go?"
            callBack={this.routerNav}
          />
        </View>
        <Text>{this.props.ciudad}</Text>
        {rideNav}
      </View>
    );
  }
}

Home.navigationOptions = {
  header: null
};

export default Home;

/*

        <Button
          title="CARGAR ROUTER"
          onPress={() => this.props.navigation.navigate("Router")}
        />


            <Icon style={styles.icon} name="search" />
            <TextInput
              style={styles.input}
              underlineColorAndroid="rgba(0,0,0,0)"
              defaultValue="Where do you want to go?"
            />

*/
