import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import HeaderButton from "../../components/headerButton";
import Map from "./map";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { position: { latitude: 0, longitude: 0 } };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Map position={this.state.position} />
        <HeaderButton onPress={() => navigate("DrawerOpen")} />
      </View>
    );
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    }, null);
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
