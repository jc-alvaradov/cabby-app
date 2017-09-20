import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { cambiarCiudad } from "../../actions/cambiar_ciudad";

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.textChange = this.textChange.bind(this);
  }

  textChange(data) {
    //console.log(data);
    this.setState({ text: data.description });
    console.log("Voy a despachar la accion con texto: " + data.description);
    this.props.cambiarCiudad(data.description);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>YO SOY EL ROUTER</Text>
        <GooglePlacesAutocomplete
          placeholder="Where do you want to go?"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            this.textChange(data);
            //console.log(data);
            //console.log(details);
          }}
          getDefaultValue={() => {
            return ""; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: "AIzaSyAJTjCs9OddMqnuyL6qXowI8SYQTwU5vjQ",
            language: "es", // language of the results
            types: "address" // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              width: 300,
              minHeight: 50,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              backgroundColor: "rgba(0,0,0,0)"
            },
            textInput: {
              maxWidth: 300,
              height: 50,
              borderRadius: 1,
              backgroundColor: "#FFFFFF",
              color: "#444444",
              fontSize: 18,
              marginTop: 5,
              elevation: 3
            },
            listView: {
              maxWidth: 300,
              margin: 0,
              marginLeft: 8,
              marginRight: 8,
              maxHeight: 280,
              borderColor: "#000000",
              backgroundColor: "#FFFFFF"
            },
            row: {
              maxWidth: 290,
              borderTopColor: "red"
            },
            poweredContainer: {
              width: 0,
              height: 0
            }
          }}
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: "distance"
          }}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3"
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    alignItems: "center",
    paddingTop: 10
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ cambiarCiudad: cambiarCiudad }, dispatch);
}

export default connect(null, mapDispatchToProps)(Router);
