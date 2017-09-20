import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationActions } from "react-navigation";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "Default name",
        avatar:
          "https://scontent.flim5-4.fna.fbcdn.net/v/t1.0-9/14915587_1607787762860110_7545303131173262469_n.jpg?oh=49abfb0e8f9abbeab44842ce519a2e96&oe=59FF610C"
      }
    };
    this.closeSession = this.closeSession.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  async closeSession() {
    try {
      await AsyncStorage.removeItem("@TNStore:login");
      const gotoMain = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Checker" })]
      });
      setTimeout(this.props.navigation.dispatch.bind(null, gotoMain), 500);
    } catch (error) {
      // Error saving data
    }
  }

  async loadUser() {
    return await AsyncStorage.getItem("@TNStore:login");
  }

  componentDidMount() {
    // revisar si this.loadUser retorna null y cerrar la sesión si es que es asi
    this.loadUser().then(user => {
      this.setState({
        user: JSON.parse(user)
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Settings</Text>
        <Image
          style={{ width: 90, height: 90, borderRadius: 45 }}
          source={{ uri: this.state.user.avatar }}
        />
        <Text style={styles.userName}>{this.state.user.name}</Text>
        <TouchableOpacity
          onPress={() => navigate("Rides")}
          style={styles.button}
        >
          <Text style={styles.text}>
            <Icon name="car" size={20} />
            <Text> Rides</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Ratings")}
          style={styles.button}
        >
          <Text style={styles.text}>
            <Icon name="star" size={20} />
            <Text> Ratings</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.closeSession} style={styles.button}>
          <Text style={styles.text}>
            <Icon name="sign-out" style={styles.icon} size={20} />
            <Text> Log out</Text>
          </Text>
        </TouchableOpacity>
        <Text>{this.props.store.ciudad}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    alignItems: "center",
    paddingTop: 10
  },
  header: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20
  },
  userName: {
    fontSize: 18,
    margin: 10
  },
  button: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    width: 300,
    height: 50
  },
  text: {
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: 20,
    textAlign: "left",
    paddingLeft: 40
  }
});

function mapStateToProps(state) {
  return {
    store: state
  };
}

export default connect(mapStateToProps)(Settings);
