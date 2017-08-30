import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default class Settings extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
        <Button onPress={() => console.log("Rides")} title="Rides" />
        <Button onPress={() => console.log("Ratings")} title="Ratings" />
        <Button onPress={() => navigate("DrawerClose")} title="Close" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0
  }
});
