import React from "react";
import { Text, View } from "react-native";
import { graphRequest } from "../lib/graphRequest";
import styles from "./styles";

class SearchDriver extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // crear query que agregue un nuevo ride con los valores que me mandaron
    const { rideStart, rideFinish, amount, user } = this.props;
    const query = {
      query: "mutation($ride: RideInput!) { addRide(ride: $ride)}",
      variables: {
        ride: {
          clientName: user.name,
          clientId: user.id,
          rideState: "pending",
          amount,
          startLocation: {
            lat: rideStart.coords.latitude,
            lng: rideStart.coords.longitude
          },
          destination: {
            lat: rideFinish.coords.latitude,
            lng: rideFinish.coords.longitude
          }
        }
      }
    };

    //const saveUser = await graphRequest(query);
  }

  render() {
    return (
      <View style={styles.driverSearch}>
        <Text>Searching for Driver ...</Text>
        <Text>From {this.props.rideStart.name}</Text>
        <Text>To {this.props.rideFinish.name}</Text>
      </View>
    );
  }
}

export default SearchDriver;
