import React, { Component } from 'react';
import { Text } from 'react-native';
import Login from './routes/Login';
import Home from './routes/Home';

export default class TaxiNativeClient extends Component {
  // dependiendo de si es la primera vez abriendo la app o no 
  // se mostrara la pagina de login o el home.
  render() {
    //const loggedIn = false;
    //(!loggedIn) ? content = <Login /> : content = <Home />; 

    return (
      <Login />
    );
  }
}