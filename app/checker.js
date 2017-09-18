import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import Loading from "./components/loading";
export default class Checker extends Component {
  constructor(props) {
    super(props);
    this.loadLogin = this.loadLogin.bind(this);
  }

  componentDidMount() {
    this.loadLogin();
  }

  async loadLogin() {
    console.log("Estoy en el loadlogin");
    try {
      const value = await AsyncStorage.getItem("@TNStore:login");
      if (value !== null) {
        // el usuario ya habia iniciado sesion, checkeamos los datos y enviamos al home
        const resetNav = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "Home"
            })
          ]
        });
        setTimeout(this.props.navigation.dispatch.bind(null, resetNav), 500);
      } else {
        // el usuario no ha iniciado sesion, redirigiremos al login
        const resetNav = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "Login"
            })
          ]
        });
        setTimeout(this.props.navigation.dispatch.bind(null, resetNav), 500);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Hubo un error en el checker " + error);
    }
  }

  render() {
    // mientras carga asyncstorage mostramos una pantalla de loading
    // cuando termine de cargar redirigiremos a la pantalla correcta
    return <Loading />;
  }
}
