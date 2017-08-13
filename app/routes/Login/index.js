import React, { Component } from "react";
import { TabNavigator } from "react-navigation";
import Main from "./Main";
import Confirmation from "./Confirmation";

export default class Login extends Component {
  /** muestra el main primero, donde se puede seleccionar 
 * una cuenta de facebook o google para seguir
 * despues muestra el confirmation que es un formulario 
 * donde se rellenan los datos que falten
 */
  render() {
    return <Confirmation />;
  }
}
