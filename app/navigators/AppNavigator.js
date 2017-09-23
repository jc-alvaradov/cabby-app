import React from "react";
import {
  DrawerNavigator,
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from "react-navigation";
import { BackHandler } from "react-native";
import { connect } from "react-redux";
import Loader from "../routes/loader";
import Login from "../routes/login";
import Confirmation from "../routes/confirmation";
import MapScreen from "../routes/Home";
import Settings from "../routes/settings";
import Router from "../routes/router";
import Rides from "../routes/rides";
import Ratings from "../routes/ratings";

const Main = StackNavigator(
  {
    Map: {
      screen: MapScreen
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
    headerMode: "screen",
    initialRouteName: "Map"
  }
);

const HomeScreen = DrawerNavigator(
  {
    Main: {
      screen: Main
    }
  },
  {
    contentComponent: props => <Settings {...props} />
  }
);

export const AppNavigator = StackNavigator(
  {
    Loader: {
      screen: Loader
    },
    Login: {
      screen: Login
    },
    Confirmation: {
      screen: Confirmation
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    }
  },
  {
    headerMode: "screen",
    initialRouteName: "Loader"
  }
);

class AppWithNavigationState extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };
  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: nav })}
      />
    );
  }
}

/*
const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);
*/

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
