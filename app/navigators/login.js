import React, { Component } from "react";
import { Text, View, Button, AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logIn } from "../actions/logIn";

class Login extends Component {
  constructor(props) {
    super(props);
    this.saveUser = this.saveUser.bind(this);
  }

  async saveUser() {
    try {
      const user = {
        loggedIn: true,
        name: "Juan Carlos Alvarado"
      };
      await AsyncStorage.setItem("@TNStore:user", JSON.stringify(user));
    } catch (error) {
      // Error saving data
      console.log("Error saving user");
    }
  }

  componentDidMount() {
    //this.saveUser();
  }

  render() {
    return (
      <View>
        <Text>Please login to continue</Text>
        <Text>{this.props.store.ciudad}</Text>
        <Button title="Log In" onPress={() => this.props.logIn()} />
      </View>
    );
  }
}

Login.navigationOptions = {
  header: null
};

function mapStateToProps(state) {
  return {
    store: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logIn: logIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
