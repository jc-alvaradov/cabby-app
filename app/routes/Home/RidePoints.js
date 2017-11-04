import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

class RidePoints extends React.Component {
  render() {
    let points = null;
    const { rideStart, rideFinish, rideState } = this.props;
    if (
      rideStart != null &&
      rideFinish != null &&
      rideState === "ride_select"
    ) {
      points = (
        <View>
          <MapView.Marker
            key="rideStartKeyTn"
            coordinate={rideStart.coords}
            image={require("../../images/ride_start.png")}
          />
          <MapView.Marker
            key="rideFinishKeyTn"
            coordinate={rideFinish.coords}
            image={require("../../images/ride_finish.png")}
          />
        </View>
      );
    }
    return points;
  }
}

export default RidePoints;
