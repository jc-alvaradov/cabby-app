import React from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from "react-navigation";
import { changePayment } from "../actions/change_payment";
import Icon from "react-native-vector-icons/FontAwesome";

class Payments extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TouchableOpacity
            onPress={() => this.props.changePayment("cash")}
            style={styles.topBtn}
          >
            <View style={styles.text}>
              <View style={styles.textChild}>
                <Icon name="money" size={25} color="#47C9A2" />
                <Text> Cash </Text>
              </View>
              {this.props.payment === "cash" ? (
                <Text style={styles.icon}>
                  <Icon name="check" color="#47C9A2" size={20} />
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.changePayment("paypal")}
            style={styles.button}
          >
            <View style={styles.text}>
              <View style={styles.textChild}>
                <Image
                  style={{
                    width: 50,
                    height: 25
                  }}
                  source={require("../images/paypal.png")}
                />
                <Text numberOfLines={1}> Paypal</Text>
              </View>
              {this.props.payment === "paypal" ? (
                <Text style={styles.icon}>
                  <Icon name="check" color="#47C9A2" size={20} />
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.changePayment("khipu")}
            style={[styles.button, styles.bottomBtn]}
          >
            <View style={styles.text}>
              <View style={styles.textChild}>
                <Image
                  style={{
                    width: 50,
                    height: 25
                  }}
                  source={require("../images/khipu.png")}
                />
                <Text numberOfLines={1}> Khipu</Text>
              </View>
              {this.props.payment === "khipu" ? (
                <Text style={styles.icon}>
                  <Icon name="check" color="#47C9A2" size={20} />
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Payments.navigationOptions = {
  title: "Payments"
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    alignItems: "center",
    paddingTop: 10
  },
  button: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
    padding: 10,
    width: 280,
    height: 50
  },
  topBtn: {
    backgroundColor: "#ffffff",
    padding: 10,
    width: 280,
    height: 50,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  bottomBtn: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
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
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 8
  },
  form: {
    width: 280
  }
});

mapStateToProps = state => {
  return {
    user: state.user,
    payment: state.payment
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators({ changePayment }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
