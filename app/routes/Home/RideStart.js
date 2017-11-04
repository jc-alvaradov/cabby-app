import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

class RideStart extends React.Component {
  render() {
    let render = null;
    const { pos, rideState } = this.props;
    const condition =
      rideState === "start_pos_select" || rideState === "finish_pos_select";
    if (pos != null && condition) {
      return (
        <View>
          <MapView.Marker
            key="rideStartPlanTn"
            coordinate={pos.coords}
            image={require("../../images/ride_start.png")}
          />
        </View>
      );
    }
    return render;
  }
}

export default RideStart;
