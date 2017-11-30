import React from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/basicButton";

class Settings extends React.Component {
  state = {
    name: ""
  };

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigate("ProfileSettings")}
          style={styles.button}
        >
          <Text style={styles.text}>
            <Icon name="user" size={20} />
            <Text> Profile</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("PaymentSettings")}
          style={styles.button}
        >
          <Text style={styles.text}>
            <Icon name="credit-card" size={20} />
            <Text> Payment Settings</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Settings.navigationOptions = {
  title: "Settings"
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    alignItems: "center",
    paddingTop: 20
  },
  button: {
    backgroundColor: "#ffffff",
    marginBottom: 20,
    padding: 10,
    width: 280,
    height: 50,
    borderRadius: 2
  },
  text: {
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: 18,
    textAlign: "left",
    lineHeight: 25
  },
  input: {
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "white",
    height: 50,
    elevation: 2
  },
  saveBtn: {
    alignItems: "center"
  }
});

mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, null)(Settings);
