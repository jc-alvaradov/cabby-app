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

  componentWillReceiveProps(nextProps) {
    if (nextProps.rideNav === "ride_select") {
      setTimeout(() => {
        this.mapRef.fitToCoordinates(
          [this.props.store.rideStart, this.props.store.rideFinish],
          {
            edgePadding: {
              top: 50,
              left: 100,
              bottom: 300,
              right: 100
            },
            animated: true
          }
        );
      }, 1000);
    }
  }

  render() {
    let line = null;
    if (this.props.polyCoords != null && this.props.polyCoords.length > 0) {
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
        pitchEnabled={false}
        showsUserLocation={true}
        showsMyLocationButton={false}
        provider={"google"}
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
        <RidePoints
          rideStart={this.props.store.rideStart}
          rideFinish={this.props.store.rideFinish}
        />
        {line}
      </MapView>
    );
  }
}

const RidePoints = ({ rideStart, rideFinish }) => {
  let render = null;
  if (rideStart != null && rideFinish != null) {
    render = (
      <View>
        <MapView.Marker
          key="rideStartKeyTn"
          coordinate={rideStart}
          image={require("../../images/ride_start.png")}
        />
        <MapView.Marker
          key="rideFinishKeyTn"
          coordinate={rideFinish}
          image={require("../../images/ride_finish.png")}
        />
      </View>
    );
  }

  return render;
};

function mapStateToProps(state) {
  return {
    store: state,
    rideNav: state.rideNav,
    polyCoords: state.polyCoords
  };
}

export default connect(mapStateToProps)(Map);

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
