import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import AppNav from "./navigators/app_navigator";
import LoginNav from "./navigators/login_navigator";

class MainClient extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("APP: " + AppNav);

    return <View />;
  }
}

function mapStateToProps(state) {
  return {
    store: state
  };
}

export default connect(mapStateToProps)(MainClient);
