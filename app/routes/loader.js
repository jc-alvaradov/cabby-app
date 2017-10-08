import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loading from "../components/loading";
import { loadStartScreen, loadHomeScreen } from "../actions/load_screens";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.getAppState = this.getAppState.bind(this);
  }

  componentDidMount() {
    this.getAppState();
  }

  async getAppState() {
    try {
      const user = await AsyncStorage.getItem("@TNStore:user");
      if (user != null) {
        // user is logged in
        this.props.loadHomeScreen(JSON.parse(user));
      } else {
        // user is not logged in
        this.props.loadStartScreen();
      }
    } catch (error) {
      console.log("There was an error reading from disk");
    }
  }

  render() {
    return <Loading />;
  }
}

Loader.navigationOptions = {
  header: null
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadStartScreen, loadHomeScreen }, dispatch);
}
export default connect(null, mapDispatchToProps)(Loader);
