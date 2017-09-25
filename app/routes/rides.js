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

export default class Rides extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Rides </Text>
      </View>
    );
  }
}

Rides.navigationOptions = {
  title: "Rides"
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    alignItems: "center",
    paddingTop: 10
  }
});
