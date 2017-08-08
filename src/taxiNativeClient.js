import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './map';

class TaxiNativeClient extends Component {
  constructor(props) {
    super(props);
    this.state = {position: { latitude: 0, longitude: 0, } }
  }

  render(x) {
    return (
      <View style={styles.container}>
        <Map position={this.state.position}/>
      </View>
    );
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        });
      }, null, { enableHighAccuracy: true}
    );
  }
}

export default TaxiNativeClient;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});