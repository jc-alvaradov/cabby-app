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
import Geocoder from "react-native-geocoder";
import { showIcons } from "../actions/show_icons";
import { rideNav } from "../actions/ride_nav";
import { setStart, setFinish } from "../actions/ride_position";
import AutoCompleteInput from "../components/autoCompleteInput";
import Button from "../components/basicButton";

class Router extends Component {
  constructor(props) {
    super(props);
    const startText = this.props.navigation.hasOwnProperty("state")
      ? this.props.navigation.state.params.userPos
      : "Start Location";
    const finishText = this.props.navigation.hasOwnProperty("state")
      ? this.props.navigation.state.params.ciudad
      : "Finish Location";

    this.state = {
      startText: startText,
      finishText: finishText,
      start: startText,
      finish: finishText
    };
  }

  getStartValue = value => {
    this.setState({ start: value });
  };

  getFinishValue = value => {
    this.setState({ finish: value });
  };

  showRoute = () => {
    // escondemos los iconos de la pantalla principal
    this.props.showIcons(false);
    // elegimos el estado de navegacion donde se muestra la ruta del viaje
    this.props.rideNav("ride_select");

    Geocoder.geocodeAddress(this.state.start).then(res => {
      // despachamos la posicion de inicio del viaje
      const startPos = {
        name: this.state.start,
        coords: {
          latitude: res[0].position.lat,
          longitude: res[0].position.lng
        }
      };
      this.props.setStart(startPos);
    });

    Geocoder.geocodeAddress(this.state.finish).then(res => {
      // despachamos la posicion final del viaje
      const finishPos = {
        name: this.state.finish,
        coords: {
          latitude: res[0].position.lat,
          longitude: res[0].position.lng
        }
      };
      this.props.setFinish(finishPos);
    });

    this.props.navigation.goBack();
  };

  setOnMap = () => {
    this.props.showIcons(false);
    this.props.rideNav("start_pos_select");
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View>
            <Text>Start Location</Text>
            <AutoCompleteInput
              defaultValue={this.state.startText}
              show={true}
              getValue={this.getStartValue}
            />
          </View>
          <View style={styles.input}>
            <Text>Finish Location</Text>
            <AutoCompleteInput
              defaultValue={this.state.finishText}
              getValue={this.getFinishValue}
              show={true}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button text="Show Route" btnStyle="small" onTouch={this.showRoute} />
          <Button text="Set on Map" btnStyle="small" onTouch={this.setOnMap} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  inputContainer: {
    marginTop: 10,
    width: 300,
    height: 100
  },
  input: {
    marginTop: 70
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 70,
    width: 270,
    height: "auto",
    zIndex: 1
  }
});

Router.navigationOptions = {
  title: "Choose a Route"
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { showIcons, rideNav, setStart, setFinish },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Router);
