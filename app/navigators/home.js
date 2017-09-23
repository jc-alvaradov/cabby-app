import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { cambiarCiudad } from "../actions/cambiar_ciudad";
import { logOut } from "../actions/logOut";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.cambiarNombre = this.cambiarNombre.bind(this);
  }

  cambiarNombre() {
    this.props.cambiarCiudad(this.state.text);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text syle={styles.text}>{this.props.store.ciudad}</Text>
        <TextInput
          style={styles.textField}
          onChangeText={text => this.setState({ text })}
        />
        <Button
          title="Cambiar Nombre de la Ciudad"
          onPress={() => this.cambiarNombre()}
        />
        <Button title="Cerrar Sesión" onPress={() => this.props.logOut()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 40
  },
  textField: {
    width: 120
  }
});

Home.navigationOptions = {
  header: null
};

function mapStateToProps(state) {
  return {
    store: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logOut: logOut,
      cambiarCiudad: cambiarCiudad
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
