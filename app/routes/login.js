import React, { Component } from "react";
import { Text, View, Button, Platform, Linking } from "react-native";
import { NavigationActions } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import Styles from "./styles";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.handleOpenURL = this.handleOpenURL.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
  }

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL({ url }) {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    if (Platform.OS === "ios") {
      SafariView.dismiss();
    }

    this.props.navigation.navigate("Confirmation", {
      user: JSON.parse(decodeURI(user_string))
    });
    this.setState({ selected: false });
  }

  loginWithFacebook() {
    if (!this.state.selected) {
      this.openURL("http://45.7.229.110:3000/auth/facebook");
      this.setState({ selected: true });
    }
  }

  loginWithGoogle() {
    if (!this.state.selected) {
      this.openURL("http://45.7.229.110:3000/auth/google");
      this.setState({ selected: true });
    }
  }

  openURL(url) {
    // Use SafariView on iOS
    if (Platform.OS === "ios") {
      SafariView.show({
        url: url,
        fromBottom: true
      });
    } else {
      // Or Linking.openURL on Android
      Linking.openURL(url);
    }
  }

  render() {
    return (
      <View style={Styles.mainContainer}>
        <Text style={Styles.title}>Taxi Native</Text>
        <View style={Styles.login}>
          <Text style={Styles.headText}>Please login to continue</Text>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
            Login with Facebook
          </Icon.Button>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            Login with Google
          </Icon.Button>
        </View>
      </View>
    );
  }
}

Login.navigationOptions = {
  header: null
};

const iconStyles = {
  borderRadius: 1,
  iconStyle: { paddingVertical: 5 }
};
