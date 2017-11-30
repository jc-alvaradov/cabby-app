import React from "react";
import { View, Image } from "react-native";
import Button from "../../components/basicButton";
import BackButton from "../../components/backButton";
import styles from "../styles";

class StartPosSelect extends React.Component {
  render() {
    return (
      <View style={styles.pinContainer} pointerEvents="box-none">
        <View style={styles.pickupContainer} pointerEvents="none">
          <Image
            style={{ width: 40, height: 59 }}
            source={require("../../images/ride_start.png")}
          />
        </View>
        <View style={styles.pickupBtn} pointerEvents="box-none">
          <View style={styles.backBtn} pointerEvents="box-none">
            <BackButton onTouch={this.props.close} />
          </View>
          <Button
            text="Set Pickup Location"
            btnStyle="long"
            key="startLocationBtn"
            onTouch={this.props.setPickupLocation}
          />
        </View>
      </View>
    );
  }
}

export default StartPosSelect;
