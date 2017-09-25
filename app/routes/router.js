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
import { cambiarCiudad } from "../actions/cambiar_ciudad";
import AutoCompleteInput from "../components/autoCompleteInput";
import Button from "../components/basicButton";

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

  showRoute() {
    // esconder iconos de settings y caja de busqueda,
    // guardar en el estado el startPos y destPos de las cajas de busqueda(lat y lng)
    // despachar una accion que llame al getDirections para que dibuje el mapa
    // y muestre un estimado de la distancia y precio, ademas de 2 botones, uno de
    // pedir taxi y otro de cancelar
    // cambiar variable rideMap para que muestre una caja con botones
  }

  render() {
    const defaultStart = this.props.navigation.hasOwnProperty("state")
      ? this.props.navigation.state.params.userPos
      : "Start Location";

    const defaultFinish = this.props.navigation.hasOwnProperty("state")
      ? this.props.navigation.state.params.ciudad
      : "Finish Location";

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View>
            <Text>Start Location</Text>
            <AutoCompleteInput defaultValue={defaultStart} />
          </View>
          <View style={styles.input}>
            <Text>Finish Location</Text>
            <AutoCompleteInput defaultValue={defaultFinish} />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button text="Show Route" btnStyle="small" onTouch={this.showRoute} />
          <Button text="Set on Map" btnStyle="small" />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ cambiarCiudad: cambiarCiudad }, dispatch);
}

export default connect(null, mapDispatchToProps)(Router);
