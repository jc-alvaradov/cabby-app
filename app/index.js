import React, { Component } from "react";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Login from "./routes/Login/Main";
import Confirmation from "./routes/Login/Confirmation";
import Home from "./routes/Home";
import Settings from "./routes/Settings";

/**
 * dependiendo de si es la primera vez abriendo la app o no 
 * se mostrara la pagina de login o el home.
 */

const logged = true;
const initialRoute = logged ? "Home" : "Login";

const MainTab = DrawerNavigator(
  {
    Home: {
      screen: Home
    }
  },
  {
    headerMode: "none",
    contentComponent: props => <Settings {...props} />
  }
);

export default StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Confirmation: {
      screen: Confirmation,
      navigationOptions: {
        title: "Confirmation",
        tabBarLabel: "Confirmation",
        tabBarIcon: ({ tintColor, focused }) =>
          <Icon
            name={focused ? "ios-home" : "ios-home-outline"}
            size={26}
            style={{ color: tintColor }}
          />
      }
    },
    Home: {
      screen: MainTab,
      navigationOptions: {
        header: null,
        headerMode: "none"
      }
    }
  },
  {
    headerMode: "screen",
    initialRouteName: initialRoute
  }
);
