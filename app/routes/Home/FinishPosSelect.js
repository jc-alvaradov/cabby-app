import React from "react";
import { View, Image } from "react-native";
import Button from "../../components/basicButton";
import BackButton from "../../components/backButton";
import styles from "../styles";

class FinishPosSelect extends React.Component {
  render() {
    return (
      <View style={styles.pinContainer} pointerEvents="box-none">
        <View style={styles.pickupContainer} pointerEvents="none">
          <Image
            style={{ width: 40, height: 59 }}
            source={require("../../images/ride_finish.png")}
          />
        </View>
        <View style={styles.pickupBtn}>
          <View style={styles.backBtn}>
            <BackButton onTouch={this.props.close} />
          </View>
          <Button
            text="Set Drop Off Location"
            key="dropOffLocationBtn"
            btnStyle="long"
            onTouch={this.props.setDropoffLocation}
          />
        </View>
      </View>
    );
  }
}

export default FinishPosSelect;
