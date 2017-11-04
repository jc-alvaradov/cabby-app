import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Geocoder from "react-native-geocoder";
import { getDirections } from "../../lib/getDirections";
import HeaderButton from "../../components/headerButton";
import AutoCompleteInput from "../../components/autoCompleteInput";
import { setPolyCoords } from "../../actions/set_polyCoords";
import RideNav from "../rideNav";
import Map from "./map";
import styles from "../styles";

class Home extends React.Component {
  routerNav = ciudad => {
    /**
     * cuando se toca una direccion de la caja de busqueda se llama a este metodo, 
     * usando la latitud y longitud de la posicion actual se obtiene el nombre de la 
     * calle actual y se parsea para darle formato. finalmente se navega hasta el router
     * que es la pantalla donde se elige finalmente el viaje. A este se le pasa como parametro
     * el nombre de la calle actual para que lo muestre por defecto como inicio del viaje
     */
    const { latitude, longitude } = this.props.position;
    Geocoder.fallbackToGoogle("AIzaSyD_FEHOrO24D__vLp9OeW2e5x6dK4w0l2s");
    Geocoder.geocodePosition({
      lat: latitude,
      lng: longitude
    }).then(res => {
      this.props.navigation.navigate("Router", {
        ciudad,
        userPos: res[0].formattedAddress
      });
    });
  };

  getPolyCoord = async (start, destination) => {
    const coords = await getDirections(start, destination);
    this.props.setPolyCoords(coords);
  };

  componentWillReceiveProps(nextProps) {
    let { rideNav, rideStart, rideFinish } = nextProps;
    if (rideNav === "ride_select" && rideStart != null && rideFinish != null) {
      rideStart = rideStart.coords;
      rideFinish = rideFinish.coords;
      const startLoc = rideStart.latitude + "," + rideStart.longitude;
      const destinationLoc = rideFinish.latitude + "," + rideFinish.longitude;
      this.getPolyCoord(startLoc, destinationLoc);
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

mapStateToProps = state => {
  return {
    showIcons: state.showIcons,
    rideNav: state.rideNav,
    rideStart: state.rideStart,
    rideFinish: state.rideFinish
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators({ setPolyCoords }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
