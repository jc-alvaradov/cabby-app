import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "../components/basicButton";
import { rideNav } from "../actions/ride_nav";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

class PaymentScreen extends React.Component {
  finishPayment = () => {
    // revisa el tipo de pago, dependiendo de eso paga de forma distinta
    if(this.props.payment === "cash"){
      this.props.rideNav("ride_finished");    
    }else if(this.props.payment === "paypal"){
      // redirigir a la pagina de paypal para que pague 
      this.props.navigation.navigate("PayWithPaypal")
    }else if(this.props.payment === "khipu"){
      this.props.rideNav("ride_finished");    
    }
  }


  render() {
    let img = "";
    let paymentMethod = "";
    if (this.props.payment === "khipu") {
      img = (
        <Image
          style={{
            width: 50,
            height: 25
          }}
          source={require("../images/khipu.png")}
        />
      );
      paymentMethod = "Continue with Khipu";
    } else if (this.props.payment === "paypal") {
      img = (
        <Image
          style={{
            width: 50,
            height: 25
          }}
          source={require("../images/paypal.png")}
        />
      );
      paymentMethod = "Continue with Paypal";
    } else {
      img = <Icon name="money" size={25} color="#47C9A2" />;
      paymentMethod = "Continue with Cash";
    }

    return (
      <View style={styles.rideApp}>
        <View style={styles.headerTitle}>
          <Text style={styles.rideStatus}>Finished Trip</Text>
          <Text>Please continue with your payment</Text>
        </View>
        <View style={paymentStyles.paymentContainer}>
          <View style={styles.ridePriceContainer}>
            <Text style={styles.ridePrice}>Total: $5.321</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Payments")}
              style={paymentStyles.button}
            >
              <View style={paymentStyles.text}>
                <View style={paymentStyles.textChild}>
                  {img}
                  <Text numberOfLines={1}> {paymentMethod}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={paymentStyles.btnContainer}>
            <Button
              text="Finish payment"
              btnStyle="finishedLong"
              onTouch={() => this.finishPayment()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const paymentStyles = StyleSheet.create({
  btnContainer: {
    width: 300,
    height: 50,
  },
  paymentContainer: {
    backgroundColor: "#ffffff",
    width: 300,
    height: 150,
    marginBottom: 160,
    paddingTop: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderRadius: 2,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 10,
    width: 280,
    height: 50
  },
  text: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  textChild: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "flex-start",
    width: 220,
    height: 20
  }
});

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      rideNav
    },
    dispatch
  );
};

mapStateToProps = state => {
  return {
    user: state.user,
    payment: state.payment
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);