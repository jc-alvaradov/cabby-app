import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { getRegionForCoordinates } from "../../lib/delta";

const Map = ({ position, cars, clientImg}) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={getRegionForCoordinates([position])}
      showsCompass={false}
      toolbarEnable={false}
      rotateEnabled={false}
    >
    {
      cars.map(car => (
      <MapView.Marker
        key={car.key}
        coordinate={car.position}
        image={require('../../images/car-top.png')}
      />
      ))
    }
      <MapView.Marker 
        coordinate={position}
        image={clientImg} 
      />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
