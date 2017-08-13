import React, { Component } from "react";
import { Text, View, Button } from "react-native";

export default class Settings extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Settings</Text>
        <Button onPress={() => navigate("DrawerClose")} title="Close" />
      </View>
    );
  }
}
