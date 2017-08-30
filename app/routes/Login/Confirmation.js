import React, { Component } from "react";
import { Text, View, TextInput, Picker, TouchableOpacity } from "react-native";
import PhoneInput from "react-native-phone-input";
import Styles from "./styles";

export default class Confirmation extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Styles.container}>
        <View style={Styles.form}>
          <Text style={Styles.header}>Name</Text>
          <TextInput
            style={Styles.input}
            underlineColorAndroid="rgba(0,0,0,0)"
            defaultValue="Juan Carlos"
          />
          <Text style={Styles.header}>Email</Text>
          <TextInput
            style={Styles.input}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Text style={Styles.header}>Phone Number</Text>
          <PhoneInput
            ref="phone"
            textStyle={{ fontSize: 15 }}
            initialCountry="cl"
          />
          <Text style={Styles.header}>Payment Method</Text>
          <Picker selectedValue="Cash">
            <Picker.Item label="Cash" value="cash" />
            <Picker.Item label="Paypal" value="paypal" />
          </Picker>
        </View>
        <TouchableOpacity
          onPress={() => navigate("Home")}
          style={Styles.button}
        >
          <Text style={Styles.text}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
