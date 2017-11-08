import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native";
import { graphRequest } from "../lib/graphRequest";
import Loading from "../components/loading";

class Rides extends React.Component {
  state = {
    rides: []
  };

  getUserRides = async user => {
    const request = {
      query:
        "query ($id: String!) { getClientRides(id: $id){ _id amount driverName clientName startLocation{ lat lng } destination{ lat lng } rideState}}",
      variables: {
        id: user._id
      }
    };
    // chequear que haya internet
    graphRequest(request).then(res => {
      if (res !== undefined) {
        const rides = res.data.data.getClientRides;
        this.setState({ rides });
      } else {
        //console.log("bad response");
      }
    });
  };

  componentDidMount() {
    this.getUserRides(this.props.navigation.state.params.user);
  }

  render() {
    const { navigate } = this.props.navigation;
    const screen =
      this.state.rides.length > 0 ? (
        <FlatList
          data={this.state.rides}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            return (
              <View style={styles.rides}>
                <Text>{item.driverName}</Text>
                <Text>{item.amount}</Text>
              </View>
            );
          }}
        />
      ) : (
        <Loading />
      );

    return screen;
  }
}

Rides.navigationOptions = {
  title: "Rides"
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    paddingTop: 10
  },
  rides: {
    marginTop: 30,
    padding: 10,
    height: 80,
    backgroundColor: "#ffffff",
    elevation: 3
  }
});

export default Rides;
