import React from "react";
import { Text, View, AsyncStorage, TextInput, Picker } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PhoneInput from "react-native-phone-input";
import { loadHomeScreen } from "../actions/load_screens";
import Button from "../components/basicButton";
import Styles from "./styles";

class Confirmation extends React.Component {
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
      const user = this.props.navigation.state.params.user;
      user.loggedIn = true;
      this.saveData(JSON.stringify(user)).then(() => {
        this.props.loadHomeScreen(user);
      });
    }
  }

  async saveData(user) {
    try {
      return await AsyncStorage.setItem("@TNStore:user", user);
    } catch (error) {
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
        <Button onTouch={this.continue} text="Continue" btnStyle="default" />
      </View>
    );
  }
}

Confirmation.navigationOptions = {
  title: "Confirmation"
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadHomeScreen: loadHomeScreen }, dispatch);
}

export default connect(null, mapDispatchToProps)(Confirmation);
