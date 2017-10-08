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
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      loading: false
    };
    this.handleOpenURL = this.handleOpenURL.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.userIsRegistered = this.userIsRegistered.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  async saveData(user) {
    try {
      return await AsyncStorage.setItem("@TNStore:user", user);
    } catch (error) {
      console.log("Error saving data");
    }
  }

  async userIsRegistered(user) {
    /*
      Evita que se registre un usuario mas de una vez. 
      Ej: Si un usuario crea una cuenta y despues cierra la app se borraran sus datos, 
      por lo que al tratar de iniciar sesion nuevamente se le haria registrarse nuevamente.
      Este metodo revisa que el usuario ya exista en la base de datos, en cuyo caso lo lleva 
      al menu principal. Si no existe, crea una nueva cuenta.
      
    */
    user = JSON.parse(user);
    const query = {
      query: "query ($login: String!) { userExists(login: $login) }",
      variables: {
        login: user.id
      }
    };

    const alreadyExists = await graphRequest(query);
    if (alreadyExists != null) {
      if (alreadyExists.data.data.userExists === true) {
        this.saveData(JSON.stringify(user)).then(() => {
          this.props.loadHomeScreen(user);
        });
      } else {
        this.props.navigation.navigate("Confirmation", {
          user: user
        });
        this.setState({ selected: false, loading: false });
      }
    }
  }

  handleOpenURL({ url }) {
    // recibimos el usuario como cadena, lo decodeamos y revisamos si ya esta registrado en el servidor.
    // si ya esta registrado al servidor guardamos al user en el estado y navegamos al home. Si no lo esta
    // navegamos al confirmation
    const [, user_string] = url.match(/user=([^#]+)/);
    if (Platform.OS === "ios") {
      SafariView.dismiss();
    }
    this.userIsRegistered(decodeURI(user_string));
  }

  loginWithFacebook() {
    if (!this.state.selected) {
      this.openURL("http://45.7.229.110:3000/auth/facebook");
      this.setState({ selected: true, loading: true });
    }
  }

  loginWithGoogle() {
    if (!this.state.selected) {
      this.openURL("http://45.7.229.110:3000/auth/google");
      this.setState({ selected: true, loading: true });
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadHomeScreen: loadHomeScreen }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
