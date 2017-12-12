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
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Loading from "../components/loading";

class Ratings extends React.Component {
  state = {
    ratings: []
  };

  getUserRatings = async user => {
    const request = {
      query:
        "query ($id: String!) { getClientRatings(id: $id){ _id rating fromId toId message date}}",
      variables: {
        id: user._id
      }
    };
    // chequear que haya internet
    let res = await graphRequest(request, "getClientRatings");
    if (res !== null) {
      let ratings = await this.getRatings(res, user);
      ratings = ratings.filter(rating => {
        return rating !== null;
      });
      this.setState({ ratings });
    } else {
      //console.log("bad response");
    }
  };

  getRatings = (ratings, user) => {
    let driver;
    // parseamos los ratings, hacemos peticiones para obtener el from y to de cada rating
    ratings = ratings.map(async rating => {
      rating.to = {};
      rating.from = {};
      if (rating.fromId === user._id) {
        // el rating lo hizo el user
        rating.from.name = user.clientName;
        rating.from.photo = user.photo;
        // ahora pedimos los datos del driver
        const req = {
          query:
            "query ($id: String!) { getDriverById(id: $id){ _id driverName photo}}",
          variables: {
            id: rating.toId
          }
        };
        driver = await graphRequest(req, "getDriverById");
        if (driver != null) {
          rating.to.name = driver.driverName;
          rating.to.photo = driver.photo;
          return rating;
        } else {
          return null;
        }
      } else if (rating.toId === user._id) {
        // le hicieron el rating al user
        rating.to.name = user.clientName;
        rating.to.photo = user.photo;
        // ahora pedimos los datos del driver
        const req = {
          query:
            "query ($id: String!) { getDriverById(id: $id){ _id driverName photo}}",
          variables: {
            id: rating.fromId
          }
        };
        driver = await graphRequest(req, "getDriverById");
        if (driver != null) {
          rating.from.name = driver.driverName;
          rating.from.photo = driver.photo;
          return rating;
        } else {
          return null;
        }
      }
    });
    return Promise.all(ratings);
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
                <View style={styles.rating}>
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                    source={{ uri: item.from.photo }}
                  />
                  <Text numberOfLines={1}>{item.from.name}</Text>
                </View>
                <Icon name="arrow-right" size={25} />
                <View style={styles.rating}>
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                    source={{ uri: item.to.photo }}
                  />
                  <Text numberOfLines={1}>{item.to.name}</Text>
                </View>
                <Text style={styles.rideRating}>{item.rating}</Text>
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    padding: 10,
    height: 80,
    backgroundColor: "#ffffff",
    elevation: 3
  },
  rating: {
    width: 120,
    maxWidth: 120
  },
  rideRating: {
    fontSize: 24,
    fontWeight: "bold"
  }
});

export default Ratings;
