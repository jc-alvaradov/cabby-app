import React from "react";
import { Text, View, AsyncStorage, TextInput, Picker } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PhoneInput from "react-native-phone-input";
import { graphRequest } from "../lib/graphRequest";
import { loadHomeScreen } from "../actions/load_screens";
import Button from "../components/basicButton";
import Styles from "./styles";

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.navigation.state.params.user;
    this.state = {
      pressed: false,
      name: user.name,
      email: user.email,
      phone: null,
      payment: "Cash",
      errorMsg: ""
    };
    this.continue = this.continue.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  continue() {
    // checkea que los datos esten llenados y correctos
    const validFields =
      this.state.name != null &&
      this.state.email != null &&
      this.state.phone != null &&
      this.state.payment != null;
    if (!this.state.pressed && validFields === true) {
      const user = {
        login: this.props.navigation.state.params.user.id,
        photo: this.props.navigation.state.params.user.avatar,
        clientName: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        payment: this.state.payment,
        rating: 0,
        active: "active"
      };
      this.saveData(user).then(res => {
        if (res === false) {
          //console.log("Hubo un problema guardando el usuario");
        }
        // FIXME: continuamos de todas formas por ahora
        this.props.loadHomeScreen(res);
      });
    } else {
      this.setState({ errorMsg: "Please fill in all fields" });
    }
  }

  async saveData(user) {
    const query = {
      query:
        "mutation ($cliente: ClientInput!) { addClient(client: $cliente){ _id login clientName active phone photo email rating payment} }",
      variables: {
        cliente: user
      }
    };
    // chequear que haya internet conectado
    let savedUser = await graphRequest(query, "addClient");
    if (savedUser != null) {
      try {
        await AsyncStorage.setItem("@TNStore:user", JSON.stringify(savedUser));
        return savedUser;
      } catch (error) {
        //console.log("Error saving data");
        return false;
      }
    } else {
      return false;
    }
  }

  render() {
    const user = this.props.navigation.state.params.user;
    return (
      <View style={Styles.confirmationContainer}>
        <View style={Styles.form}>
          <Text style={Styles.errorMsg}>{this.state.errorMsg}</Text>
          <Text style={Styles.header}>Name</Text>
          <TextInput
            style={Styles.confirmationInput}
            underlineColorAndroid="rgba(0,0,0,0)"
            maxLength={30}
            defaultValue={user.name}
            onChangeText={name => this.setState({ name })}
          />
          <Text style={Styles.header}>Email</Text>
          <TextInput
            style={Styles.confirmationInput}
            underlineColorAndroid="rgba(0,0,0,0)"
            maxLength={30}
            defaultValue={user.email}
            onChangeText={email => this.setState({ email })}
          />
          <Text style={Styles.header}>Phone Number</Text>
          <View style={Styles.phone}>
            <PhoneInput
              ref="phone"
              textStyle={{ fontSize: 15 }}
              initialCountry="cl"
              textProps={{ maxLength: 12 }}
              onChangePhoneNumber={phone => this.setState({ phone })}
            />
          </View>
          <Text style={Styles.header}>Payment Method</Text>
          <Picker
            style={Styles.picker}
            selectedValue={this.state.payment}
            onValueChange={payment => this.setState({ payment })}
          >
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Paypal" value="Paypal" />
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
