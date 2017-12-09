import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "../components/basicButton";
import { rideNav } from "../actions/ride_nav";
import { graphRequest } from "../lib/graphRequest";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

class PaymentScreen extends React.Component {

  finishPayment = () => {
    // revisa el tipo de pago, dependiendo de eso paga de forma distinta
    if(this.props.payment === "cash"){
      this.props.rideNav("ride_finished");    
    }else if(this.props.payment === "paypal"){
      // redirigir a la pagina de paypal para que pague 
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
      paymentMethod = "Khipu";
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
      paymentMethod = "Paypal";
    } else {
      img = <Icon name="money" size={25} color="#47C9A2" />;
      paymentMethod = "Cash";
    }

    return (
      <View style={styles.rideApp}>
        <View style={styles.headerTitle}>
          <Text style={styles.rideStatus}>Finished Trip</Text>
          <Text>Please continue with your payment</Text>
        </View>
        <View style={styles.finishedContainer}>
          <View style={styles.ridePriceContainer}>
            <Text style={styles.ridePrice}>Total: $5.321</Text>
          </View>
          <View>
            <Text>Continue With</Text>
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
          <View style={styles.rideBtn}>
            <Button
              style={styles.pickupBtn}
              text="Finish payment"
              btnStyle="inline"
              onTouch={() => this.finishPayment()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const paymentStyles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
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
