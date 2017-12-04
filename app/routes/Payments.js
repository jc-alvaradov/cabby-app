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

class Payments extends React.Component {
  state = {
    selected: ""
  };

  changeSelection = selection => {
    this.setState({ selected: selection });
  };

  componentDidMount() {
    // recibir desde el servidor todas las cuentas asociadas (encriptadas) y guardarlas en el estado
    // renderizar la lista de cuentas
    // la cuenta seleccionada muestra un icono de checked a su derecha
  }

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TouchableOpacity
            onPress={selection => this.changeSelection("Cash")}
            style={styles.topBtn}
          >
            <View style={styles.text}>
              <View style={styles.textChild}>
                <Icon name="money" size={20} />
                <Text> Cash </Text>
              </View>
              <Text style={styles.icon}>
                <Icon name="check" color="#47C9A2" size={20} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Personal")}
            style={styles.button}
          >
            <View style={styles.text}>
              <View style={styles.textChild}>
                <Icon name="cc-paypal" size={20} />
                <Text numberOfLines={1}> Personal 4558****</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Add new")}
            style={[styles.button, styles.bottomBtn]}
          >
            <View style={styles.text}>
              <View style={styles.textChild}>
                <Icon name="plus-circle" size={20} />
                <Text> Add payment</Text>
              </View>
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
    marginTop: 8,
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
    user: state.user
  };
};

/*
              <Text style={styles.icon}>
                <Icon name="check" color="#47C9A2" size={20} />
              </Text>

*/

export default connect(mapStateToProps, null)(Payments);
