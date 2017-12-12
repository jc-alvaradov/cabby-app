import React from "react";
import { StyleSheet, View, WebView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class PayWithPaypal extends React.Component {
  render() {
    return (
      <WebView
        source={require("../html/index.html")}
        injectedJavaScript="var totalValue = 10;"
      />
    );
  }
}

/*mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      rideNav
    },
    dispatch
  );
};*/

mapStateToProps = state => {
  return {
    user: state.user,
    payment: state.payment
  };
};

export default connect(mapStateToProps, null)(PayWithPaypal);
