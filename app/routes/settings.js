import React from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/basicButton";

class Settings extends React.Component {
  state = {
    name: ""
  };

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.header}>Name</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="rgba(0,0,0,0)"
            maxLength={30}
            defaultValue={user.clientName}
            onChangeText={name => this.setState({ name })}
          />
          <Text style={styles.header}>Payment Methods</Text>
          <TouchableOpacity
            onPress={() => navigate("Payments")}
            style={styles.button}
          >
            <Text style={styles.text}>
              <Icon name="credit-card" size={20} />
              <Text> Payment Methods</Text>
            </Text>
          </TouchableOpacity>
          <View style={styles.saveBtn}>
            <Button
              onTouch={() => console.log("payments")}
              text="Save"
              btnStyle="small"
            />
          </View>
        </View>
      </View>
    );
  }
}

Settings.navigationOptions = {
  title: "Settings"
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
    marginBottom: 10,
    padding: 10,
    width: 280,
    height: 50,
    elevation: 2
  },
  text: {
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: 16,
    textAlign: "left"
  },
  header: {
    fontSize: 18,
    color: "#444444",
    marginTop: 5,
    marginBottom: 5
  },
  input: {
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "white",
    height: 50,
    elevation: 2
  },
  form: {
    width: 280
  },
  saveBtn: {
    alignItems: "center"
  }
});

mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, null)(Settings);
