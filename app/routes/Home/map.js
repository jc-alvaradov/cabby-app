import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { regionFrom } from "../../lib/delta";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
  }

  componentDidMount() {
    console.log("Se monto el mapa");
    if (this.props.store.rideNav === "ride_select") {
      this.setTimeout(() => {
        this.mapRef.fitToSuppliedMarkers(
          ["rideStartKeyTn", "rideFinishKeyTn"],
          true
        );
      }, 500);
    }
  }

  render() {
    let line;
    if (this.props.store.rideNav === "ride_select") {
      //
    }
    if (this.props.polyCoords.length > 0) {
      line = (
        <MapView.Polyline
          coordinates={this.props.polyCoords}
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
        initialRegion={regionFrom(
          this.props.position.latitude,
          this.props.position.longitude,
          50
        )}
        showsCompass={false}
        toolbarEnable={false}
        rotateEnabled={false}
        ref={ref => {
          this.mapRef = ref;
        }}
      >
        {this.props.cars.map(car => (
          <MapView.Marker
            key={car.key}
            coordinate={car.position}
            image={require("../../images/car-top.png")}
          />
        ))}
        <MapView.Marker
          coordinate={this.props.position}
          image={require("../../images/user_low.png")}
        />
        <MapView.Marker
          key="rideStartKeyTn"
          coordinate={this.props.store.rideStart}
          image={require("../../images/car-top.png")}
        />
        <MapView.Marker
          key="rideFinishKeyTn"
          coordinate={this.props.store.rideFinish}
          image={require("../../images/car-top.png")}
        />
        {line}
      </MapView>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state
  };
}

export default connect(mapStateToProps)(Map);

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
