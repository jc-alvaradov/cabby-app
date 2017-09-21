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

const fullEnd = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    },
    Router: {
      screen: Router,
      navigationOptions: {
        title: "Router",
        headerTitle: "Router",
        tabBarLabel: "Router",
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? "ios-home" : "ios-home-outline"}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    headerMode: "screen",
    initialRouteName: "Home"
  }
);

const HomeNav = DrawerNavigator(
  {
    MainScreen: {
      screen: fullEnd,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    },
    Rides: {
      screen: Rides
    },
    Ratings: {
      screen: Ratings
    }
  },
  {
    initialRouteName: "MainScreen",
    headerMode: "screen",
    contentComponent: props => <Settings {...props} />
  }
);

const LoginNav = StackNavigator(
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
    }
  },
  {
    headerMode: "screen",
    initialRouteName: "Login"
  }
);

const NativeNav = StackNavigator(
  {
    Login: {
      screen: LoginNav,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    },
    App: {
      screen: HomeNav,
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
