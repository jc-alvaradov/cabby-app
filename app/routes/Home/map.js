import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { regionFrom } from "../../lib/delta";

const Map = ({ position, cars, clientImg, polyCoords }) => {
  let line;
  if (polyCoords.length > 0) {
    line = (
      <MapView.Polyline
        coordinates={polyCoords}
        strokeWidth={5}
        strokeColor="#49d1b1"
        lineCap="round"
        lineJoin="round"
      />
    );
  }
  return (
    <MapView
      style={styles.map}
      initialRegion={regionFrom(position.latitude, position.longitude, 50)}
      showsCompass={false}
      toolbarEnable={false}
      rotateEnabled={false}
    >
      {cars.map(car => (
        <MapView.Marker
          key={car.key}
          coordinate={car.position}
          image={require("../../images/car-top.png")}
        />
      ))}
      <MapView.Marker
        coordinate={position}
        image={require("../../images/user_low.png")}
      />
      {line}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
