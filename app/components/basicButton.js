import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let style;
    switch (this.props.btnStyle) {
      case "default":
        style = styles.default;
        break;
      case "small":
        style = styles.small;
        break;
      default:
        style = styles.default;
    }
    return (
      <TouchableOpacity onPress={this.props.onTouch} style={style}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#1ca68a",
    marginTop: 20,
    elevation: 3
  },
  small: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#1ca68a",
    marginTop: 20,
    elevation: 3
  },
  text: {
    color: "white",
    fontSize: 18
  }
});

export default Button;
