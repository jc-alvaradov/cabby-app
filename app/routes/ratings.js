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

class Ratings extends React.Component {
  state = {
    ratings: []
  };

  getUserRatings = async user => {
    const request = {
      query:
        "query ($id: String!) { getClientRatings(id: $id){ _id rating from to message date}}",
      variables: {
        id: user._id
      }
    };
    // chequear que haya internet
    graphRequest(request).then(res => {
      if (res !== undefined) {
        const ratings = res.data.data.getClientRatings;
        console.log(JSON.stringify(ratings));
        this.setState({ ratings });
      } else {
        //console.log("bad response");
      }
    });
  };

  componentDidMount() {
    this.getUserRatings(this.props.navigation.state.params.user);
  }

  render() {
    const { navigate } = this.props.navigation;
    const screen =
      this.state.ratings.length > 0 ? (
        <FlatList
          data={this.state.ratings}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            return (
              <View style={styles.ratings}>
                <Text>{item.from}</Text>
                <Text>{item.to}</Text>
                <Text>{item.message}</Text>
                <Text>{item.rating}</Text>
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

Ratings.navigationOptions = {
  title: "Ratings"
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    paddingTop: 10
  },
  ratings: {
    marginTop: 30,
    padding: 10,
    height: 80,
    backgroundColor: "#ffffff",
    elevation: 3
  }
});

export default Ratings;
