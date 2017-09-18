import React, { Component } from "react";
import {
  Text,
  View,
  AsyncStorage,
  TextInput,
  Picker,
  TouchableOpacity
} from "react-native";
import { NavigationActions } from "react-navigation";
import PhoneInput from "react-native-phone-input";
import Styles from "./styles";

export default class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };
    this.continue = this.continue.bind(this);
    this.saveData = this.saveData.bind(this);
  }
  continue() {
    // checkear que los datos esten llenados y correctos
    // datos correctos, continuamos al home
    // enviamos los datos del cliente al home con un param
    if (!this.state.pressed) {
      this.setState(
        {
          pressed: true
        },
        () => {
          this.saveData(
            JSON.stringify(this.props.navigation.state.params.user)
          ).then(() => {
            this.setState({ pressed: false }, () => {
              const gotoChecker = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Checker" })]
              });
              setTimeout(
                this.props.navigation.dispatch.bind(null, gotoChecker),
                500
              );
            });
          });
        }
      );
    }
  }

  async saveData(user) {
    try {
      return await AsyncStorage.setItem("@TNStore:login", user);
    } catch (error) {
      // Error saving data
      console.log("Error saving data");
    }
  }

  render() {
    const user = this.props.navigation.state.params.user;
    return (
      <View style={Styles.container}>
        <View style={Styles.form}>
          <Text style={Styles.header}>Name</Text>
          <TextInput
            style={Styles.input}
            underlineColorAndroid="rgba(0,0,0,0)"
            defaultValue={user.name}
          />
          <Text style={Styles.header}>Email</Text>
          <TextInput
            style={Styles.input}
            underlineColorAndroid="rgba(0,0,0,0)"
            defaultValue={user.email}
          />
          <Text style={Styles.header}>Phone Number</Text>
          <View style={Styles.phone}>
            <PhoneInput
              ref="phone"
              textStyle={{ fontSize: 15 }}
              initialCountry="cl"
            />
          </View>
          <Text style={Styles.header}>Payment Method</Text>
          <Picker style={Styles.picker} selectedValue="Cash">
            <Picker.Item label="Cash" value="cash" />
            <Picker.Item label="Paypal" value="paypal" />
          </Picker>
        </View>
        <TouchableOpacity onPress={this.continue} style={Styles.button}>
          <Text style={Styles.text}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
