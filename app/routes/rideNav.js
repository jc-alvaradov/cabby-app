import React from "react";
import { Text, View, Image, TextInput, TouchableHighlight } from "react-native";
import Button from "../components/basicButton";
import styles from "./styles";

const DriverId = ({ name, avatar }) => {
  return (
    <View style={styles.driverId}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: avatar }}
      />
      <Text>{name}</Text>
      <Text>Suzuki Maruti</Text>
    </View>
  );
};

const RideSelect = () => {
  return (
    <View>
      <Button text="Request Taxi" />
      <Button text="Cancel" />
    </View>
  );
};

const RideNav = ({ state, user }) => {
  let rideNav;
  switch (state) {
    case "searching_driver":
      break;
    case "ride_select":
      rideNav = <RideSelect />;
      break;
    case "driver_id":
      rideNav = <DriverId name={user.name} avatar={user.avatar} />;
      break;
    case "hidden":
      rideNav = null;
      break;
    default:
      rideNav = null;
  }
  return rideNav;
};

export default RideNav;
