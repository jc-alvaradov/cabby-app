import React, { Component } from "react";
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Settings from "./routes/Settings";

class TaxiNativeClient extends Component {
  /**
 * dependiendo de si es la primera vez abriendo la app o no 
 * se mostrara la pagina de login o el home.
 */

  render() {
    // FIXME: Debiera poderse ingresar a la app
    //const loggedIn = false;
    //(!loggedIn) ? content = <Login /> : content = <Home />;
    return <Home />;
  }
}

export default DrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor, focused }) =>
          <Icon
            name={focused ? "ios-home" : "ios-home-outline"}
            size={26}
            style={{ color: tintColor }}
          />
      }
    }
  },
  {
    // Register custom drawer component
    contentComponent: props => <Settings {...props} />
  }
);
