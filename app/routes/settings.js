import React, { Component } from "react";
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

class Settings extends Component {
  state = {
    name: ""
  };

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <Text>Settings</Text>
        <Text style={styles.header}>Name</Text>
        <TextInput
          style={styles.confirmationInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          maxLength={30}
          defaultValue={user.name}
          onChangeText={name => this.setState({ name })}
        />
        <Image
          style={{ width: 90, height: 90, borderRadius: 45 }}
          source={{ uri: user.photo }}
        />
        <TouchableOpacity
          onPress={() => navigate("Payments")}
          style={styles.button}
        >
          <Text style={styles.text}>
            <Icon name="credit-card" size={20} />
            <Text> Payment Methods</Text>
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
    paddingTop: 10
  },
  button: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    width: 300,
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

mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, null)(Settings);
