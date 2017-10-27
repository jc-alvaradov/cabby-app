import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  Linking,
  AsyncStorage
} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { graphRequest } from "../lib/graphRequest";
import Loading from "../components/loading";
import { loadHomeScreen } from "../actions/load_screens";
import Icon from "react-native-vector-icons/FontAwesome";
import Styles from "./styles";

class Login extends Component {
  state = {
    selected: false,
    loading: false
  };

  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  saveData = async user => {
    try {
      return await AsyncStorage.setItem("@TNStore:user", user);
    } catch (error) {
      console.log("Error saving data");
    }
  };

  userIsRegistered = async user => {
    // recibe un usuario identificado en una red social
    user = JSON.parse(user);
    /**
     * preguntamos si es que el usuario ya existe en la bd. Si ya existe entonces
     * lo guardaremos en el asyncstorage y cargaremos el menu principal
     * si no existe iremos al confirmation para que el usuario agregue los datos extra
     */
    const query = {
      query:
        "query ($login: String!) { getClient(login: $login) {_id login clientName active phone photo email rating payment }}",
      variables: {
        login: user.id
      }
    };
    let clientExists = await graphRequest(query);
    clientExists = clientExists.data.data.getClient;
    if (clientExists != null) {
      // el cliente ya existe en la bd, lo cargamos en la app
      this.saveData(JSON.stringify(clientExists)).then(() => {
        this.props.loadHomeScreen(clientExists);
      });
    } else {
      /** 
       * le enviamos el usuario que recibimos desde la red social al confirmation
       * el confirmation le dara el formato correcto al usuario para guardarlo en la bd
       */
      this.props.navigation.navigate("Confirmation", {
        user: user
      });
      this.setState({ selected: false, loading: false });
    }
  };

  handleOpenURL = ({ url }) => {
    // recibimos el usuario como cadena, lo decodeamos y revisamos si ya esta registrado en el servidor.
    // si ya esta registrado al servidor guardamos al user en el estado y navegamos al home. Si no lo esta
    // navegamos al confirmation
    const [, user_string] = url.match(/user=([^#]+)/);
    if (Platform.OS === "ios") {
      SafariView.dismiss();
    }
    this.userIsRegistered(decodeURI(user_string));
  };

  loginWithFacebook = () => {
    if (!this.state.selected) {
      this.openURL("http://45.7.229.110:3000/auth/facebook");
      this.setState({ selected: true, loading: true });
    }
  };

  loginWithGoogle = () => {
    if (!this.state.selected) {
      this.openURL("http://45.7.229.110:3000/auth/google");
      this.setState({ selected: true, loading: true });
    }
  };

  openURL = url => {
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
  };

  render() {
    let render = <Loading />;
    if (this.state.loading === true) {
      render = <Loading />;
    } else {
      render = (
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

    return render;
  }
}

Login.navigationOptions = {
  header: null
};

const iconStyles = {
  borderRadius: 1,
  iconStyle: { paddingVertical: 5 }
};

mapDispatchToProps = dispatch => {
  return bindActionCreators({ loadHomeScreen: loadHomeScreen }, dispatch);
};

export default connect(null, mapDispatchToProps)(Login);
