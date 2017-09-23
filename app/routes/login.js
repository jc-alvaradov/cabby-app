import React, { Component } from "react";
import { Text, View, Button, Platform, Linking, WebView } from "react-native";
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
    // Add event listener to handle OAuthLogin:// URLs
    // Launched from an external URL
    if (Platform.OS === "ios") {
      Linking.addEventListener("url", this.handleOpenURL);
    } else {
      Linking.getInitialURL().then(url => {
        if (url) {
          console.log("Recibi la url inicial: " + url);
          this.handleOpenURL({ url });
        }
      });
    }
  }

  componentWillUnmount() {
    // Remove event listener
    console.log("Voy a remover el listener");
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL({ url }) {
    console.log("Handle Open URL was called");
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    if (Platform.OS === "ios") {
      SafariView.dismiss();
    }
    console.log("Handle Open URL recibio este link: " + decodeURI(user_string));

    // El problema es que se abre cuando sea que se llame, tiene que haber una condicion
    // de en que ventana me encuentro para abrir o no
    // si volvemos legitimamente pasaremos un parametro que se checkeara aqui
    console.log("Voy a llamar al confirmation");

    Linking.removeEventListener("url", this.handleOpenURL);
    this.props.navigation.navigate("Confirmation", {
      user: JSON.parse(decodeURI(user_string))
    });
    this.setState({ selected: false });
  }

  loginWithFacebook() {
    //console.log("Vas a iniciar sesion con facebook");
    if (!this.state.selected) {
      this.openURL("http://45.7.229.110:3000/auth/facebook");
      this.setState({ selected: true });
    }
  }

  loginWithGoogle() {
    //console.log("Vas a iniciar sesion con google");
    if (!this.state.selected) {
      this.openURL("http://45.7.229.110:3000/auth/google");
      this.setState({ selected: true });
    }
  }

  // Open URL in a browser
  openURL(url) {
    // Use SafariView on iOS
    if (Platform.OS === "ios") {
      SafariView.show({
        url: url,
        fromBottom: true
      });
    } else {
      // Or Linking.openURL on Android
      console.log("Soy openURL y me dijeron q abra esta url: " + url);
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
