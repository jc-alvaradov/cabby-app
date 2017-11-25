import React from "react";
import { Platform } from "react-native";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Loading from "../../components/loading";
import Home from "./home";

class HomeContainer extends React.Component {
  state = {
    position: {
      latitude: 0,
      longitude: 0
    },
    loading: true
  };

  loadHomeScreen = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          loading: false
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentDidMount() {
    // obtiene la posicion actual del usuario
    if (Platform.OS === "android") {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2>Please Enable Your GPS</h2>Taxi Native requires your gps to be enabled<br/>",
      ok: "OK",
      cancel: null,
      enableHighAccuracy: true,
      showDialog: true,
      openLocationServices: true
    })
      .then(
        function(success) {
          this.loadHomeScreen();
        }.bind(this)
      )
      .catch(error => {
        //console.log(error.message);
      });
    }else{
      this.loadHomeScreen();
    }
  }

  render() {
    const render = this.state.loading ? (
      <Loading />
    ) : (
      <Home position={this.state.position} navigation={this.props.navigation} />
    );
    return render;
  }
}

HomeContainer.navigationOptions = {
  header: null
};

export default HomeContainer;
