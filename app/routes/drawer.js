import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { logOut } from "../actions/load_screens";

class Drawer extends Component {
  closeSession = async () => {
    try {
      await AsyncStorage.removeItem("@TNStore:user");
      this.props.logOut();
    } catch (error) {
      // Error saving data
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const user = this.props.user;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Options</Text>
        <Image
          style={{ width: 90, height: 90, borderRadius: 45 }}
          source={{ uri: user.photo }}
        />
        <Text style={styles.userName}>{user.clientName}</Text>
        <TouchableOpacity
          onPress={() => navigate("Rides", { user })}
          style={styles.button}
        >
          <Text style={styles.text}>
            <Icon name="car" size={20} />
            <Text> Rides</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Ratings", { user })}
          style={styles.button}
        >
          <Text style={styles.text}>
            <Icon name="star" size={20} />
            <Text> Ratings</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Settings")}
          style={styles.button}
        >
          <Text style={styles.text}>
            <Icon name="cog" size={20} />
            <Text> Settings</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.closeSession} style={styles.button}>
          <Text style={styles.text}>
            <Icon name="sign-out" style={styles.icon} size={20} />
            <Text> Log out</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    alignItems: "center",
    paddingTop: 10
  },
  header: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20
  },
  userName: {
    fontSize: 18,
    margin: 10
  },
  button: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    alignSelf: 'stretch',
    height: 50
  },
  text: {
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: 20,
    textAlign: "left",
    paddingLeft: 40
  }
});

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logOut: logOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
