import React, { Component } from "react";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Checker from "./checker";
import Login from "./routes/Login/Main";
import Confirmation from "./routes/Login/Confirmation";
import Home from "./routes/Home";
import Settings from "./routes/Settings";
import Router from "./routes/Router";
import Rides from "./routes/Rides";
import Ratings from "./routes/Ratings";
/**
 * dependiendo de si es la primera vez abriendo la app o no 
 * se mostrara la pagina de login o el home.
 */

const MainTab = DrawerNavigator(
  {
    Home: {
      screen: Home
    },
    Router: {
      screen: Router
    },
    Rides: {
      screen: Rides
    },
    Ratings: {
      screen: Ratings
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <Settings {...props} />
  }
);

const NativeNav = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    },
    Confirmation: {
      screen: Confirmation,
      navigationOptions: {
        title: "Confirmation",
        tabBarLabel: "Confirmation",
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? "ios-home" : "ios-home-outline"}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    },
    Home: {
      screen: MainTab,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    },
    Checker: {
      screen: Checker,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    }
  },
  {
    headerMode: "screen",
    initialRouteName: "Checker"
  }
);

export default NativeNav;
