import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { graphRequest } from "../lib/graphRequest";
import Loading from "../components/loading";

class Rides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: []
    };
    this.getUserRides = this.getUserRides.bind(this);
  }

  async getUserRides(user) {
    const request = {
      query:
        "query ($id: String!) { getClientRides(id: $id){ id amount driverName clientName startLocation{ lat lng } destination{ lat lng } rideState}}",
      variables: {
        id: user.id
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
  }

  componentDidMount() {
    this.getUserRides(this.props.store.user);
  }

  render() {
    const { navigate } = this.props.navigation;
    const screen =
      this.state.rides.length > 0 ? (
        <FlatList
          data={this.state.rides}
          keyExtractor={item => item.id}
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

function mapStateToProps(state) {
  return {
    store: state
  };
}

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

export default connect(mapStateToProps)(Rides);
