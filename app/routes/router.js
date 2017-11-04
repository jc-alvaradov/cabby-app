import React, { Component } from "react";
import { Text, View, NetInfo } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Geocoder from "react-native-geocoder";
import { showIcons } from "../actions/show_icons";
import { rideNav } from "../actions/ride_nav";
import { setStart, setFinish } from "../actions/ride_position";
import AutoCompleteInput from "../components/autoCompleteInput";
import Button from "../components/basicButton";
import styles from "./styles";

class Router extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const startText = navigation.hasOwnProperty("state")
      ? navigation.state.params.userPos
      : "Start Location";
    const finishText = navigation.hasOwnProperty("state")
      ? navigation.state.params.ciudad
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

  showRoute = callback => {
    // revisamos si estamos conectados a internet antes de hacer la peticion
    if (this.props.connected === true) {
      Geocoder.fallbackToGoogle("AIzaSyD_FEHOrO24D__vLp9OeW2e5x6dK4w0l2s");
      Geocoder.geocodeAddress(this.state.start)
        .then(res => {
          // despachamos la posicion de inicio del viaje
          const startPos = {
            name: this.state.start,
            coords: {
              latitude: res[0].position.lat,
              longitude: res[0].position.lng
            }
          };
          this.props.setStart(startPos);
          Geocoder.geocodeAddress(this.state.finish)
            .then(res => {
              // despachamos la posicion final del viaje
              const finishPos = {
                name: this.state.finish,
                coords: {
                  latitude: res[0].position.lat,
                  longitude: res[0].position.lng
                }
              };
              this.props.setFinish(finishPos);
              // escondemos los iconos de la pantalla principal
              this.props.showIcons(false);
              // elegimos el estado de navegacion donde se muestra la ruta del viaje
              this.props.rideNav("ride_select");
              this.props.navigation.goBack();
            })
            .catch(err => {
              console.log("Hubo un error en el geocoder:" + err);
            });
        })
        .catch(err => {
          console.log("Hubo un error en el geocoder:" + err);
        });
    } else {
      //Alert.alert();
      callback();
    }
  };

  setOnMap = () => {
    if (this.props.connected === true) {
      this.props.showIcons(false);
      this.props.rideNav("start_pos_select");
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View style={styles.routerContainer}>
        <View style={styles.routerInputContainer}>
          <View>
            <Text>Start Location</Text>
            <AutoCompleteInput
              defaultValue={this.state.startText}
              show={true}
              getValue={this.getStartValue}
            />
          </View>
          <View style={styles.routerInput}>
            <Text>Finish Location</Text>
            <AutoCompleteInput
              defaultValue={this.state.finishText}
              getValue={this.getFinishValue}
              show={true}
            />
          </View>
        </View>
        <View style={styles.routerBtnContainer}>
          <Button text="Show Route" btnStyle="small" onTouch={this.showRoute} />
          <Button text="Set on Map" btnStyle="small" onTouch={this.setOnMap} />
        </View>
      </View>
    );
  }
}

Router.navigationOptions = {
  title: "Choose a Route"
};

mapStateToProps = state => {
  return {
    connected: state.connected
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { showIcons, rideNav, setStart, setFinish },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
