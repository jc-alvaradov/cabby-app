import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/SimpleLineIcons";
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
      <View>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.8]}
          colors={["#47C9A2", "#10A585"]}
          style={styles.profile}
        >
          <Image
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              borderWidth: 3,
              borderColor: "#ffffff"
            }}
            source={{ uri: user.photo }}
          />
          <Text style={styles.userName}>{user.clientName}</Text>
        </LinearGradient>
        <TouchableOpacity
          onPress={() => navigate("Rides", { user })}
          style={styles.button}
        >
          <Text style={styles.text}>
            <Icon name="map" size={20} />
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
            <Icon name="settings" size={20} />
            <Text> Settings</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.closeSession} style={styles.button}>
          <Text style={styles.text}>
            <Icon name="logout" style={styles.icon} size={20} />
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
    alignItems: "center"
  },
  profile: {
    alignItems: "center",
    margin: 0,
    paddingTop: 30,
    height: 180,
    alignSelf: "stretch"
  },
  userName: {
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: 18,
    margin: 10
  },
  button: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    marginTop: 10,
    height: 50
  },
  text: {
    backgroundColor: "#ffffff",
    fontFamily: "Nunito-Bold",
    color: "#000000",
    fontSize: 20,
    textAlign: "left",
    paddingTop: 6,
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
