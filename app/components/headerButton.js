import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Foundation";

export default class HeaderButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired
  };

  static defaultProps = {
    icon: "list"
  };

  render() {
    let btn = null;
    if (this.props.show) {
      btn = (
        <View style={styles.container}>
          <Icon.Button
            name={this.props.icon}
            size={44}
            color="#444444"
            backgroundColor="transparent"
            underlayColor="transparent"
            onPress={this.props.onPress}
          />
        </View>
      );
    }
    return btn;
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});
