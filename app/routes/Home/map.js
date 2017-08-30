import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { getRegionForCoordinates } from "../../lib/delta";

const Map = ({ position }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={getRegionForCoordinates([position])}
      showsCompass={false}
    >
      <MapView.Marker coordinate={position} />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
