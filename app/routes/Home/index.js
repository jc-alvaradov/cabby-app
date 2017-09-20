import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import NavIcon from "react-native-vector-icons/Ionicons";
import HeaderButton from "../../components/headerButton";
import Map from "./map";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientImg: undefined,
      position: {
        latitude: 0,
        longitude: 0
      },
      cars: [
        {
          key: "asdasd33k3kk!",
          position: {
            latitude: -33.112237,
            longitude: -71.569072
          }
        },
        {
          key: "lksksksks!!",
          position: {
            latitude: -33.142007,
            longitude: -71.575885
          }
        }
      ]
    };
  }

  getCars() {
    // hace una peticion get al servidor para que le envie un array con todos los conductores activos
    // cada objeto del array(conductor) tiene 2 atributos: position(latitude y longitude) y un key
    /* 
    const cars = axios.get
    if(cars != undefined){
      this.setState({cars});
    }
    
    subscribirse a la lista de autos
  

    */
  }

  componentDidMount() {
    NavIcon.getImageSource("md-navigate", 40, "#1ca68a").then(img => {
      this.setState({ clientImg: img });
    });

    //this.getCars().bind(this);

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    }, null);
  }

  render() {
    // SOlo se debiera poder hacer click una vez en el router

    return (
      <View style={styles.container}>
        <Map
          position={this.state.position}
          cars={this.state.cars}
          clientImg={this.state.clientImg}
        />
        <HeaderButton
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
        />
        <View style={styles.searchView}>
          <TouchableHighlight
            style={styles.searchInput}
            underlayColor="#f0f0f0"
            onPress={() => this.props.navigation.navigate("Router")}
          >
            <Text>Where do you want to go?</Text>
          </TouchableHighlight>
        </View>
        <Text>{this.props.store.ciudad}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state
  };
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  searchView: {
    top: 60,
    flex: 1
  },
  searchInput: {
    backgroundColor: "white",
    width: 300,
    height: 50,
    elevation: 3
  },
  input: {
    marginTop: -24,
    marginLeft: 14,
    fontSize: 18,
    width: 250,
    textAlign: "center",
    color: "#444444"
  },
  icon: {
    marginTop: 12,
    marginLeft: 10,
    color: "#444444",
    fontSize: 20
  }
});

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

/*

          <GooglePlacesAutocomplete
            placeholder="Where do you want to go?"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data);
              console.log(details);
            }}
            getDefaultValue={() => {
              return ""; // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: "AIzaSyAJTjCs9OddMqnuyL6qXowI8SYQTwU5vjQ",
              language: "es", // language of the results
              types: "(cities)" // default: 'geocode'
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

*/
