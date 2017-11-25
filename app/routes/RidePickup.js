import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import MapView from "react-native-maps";

class RidePickup extends React.Component {
  /** 
   * this initialRender state makes sure that the icon loads two times, is a hack for an issue with react native maps
   * https://github.com/airbnb/react-native-maps/issues/924
   */
  static propTypes = {
    show: PropTypes.bool.isRequired,
    distance: PropTypes.object.isRequired,
    coordinate: PropTypes.object
  };
  static defaultProps = {
    show: false,
    distance: { text: "0 min" },
    coordinate: { latitude: 0, longitude: 0 }
  };

  state = {
    initialRender: true
  };

  render() {
    let { show, distance } = this.props;
    // convertimos el valor de segundos a minutos
    distance = parseInt(distance.text);
    if (show) {
      return (
        <MapView.Marker
          coordinate={this.props.coordinate.coords}
          key="arrivalTimeMarker"
        >
          <ImageBackground
            style={styles.container}
            source={require("../images/ride_pickup.png")}
            onLayout={() => this.setState({ initialRender: false })}
            key={`${this.state.initialRender}`}
          >
            <View style={styles.textContainer}>
              <Text style={styles.mainText}>{distance}</Text>
              <Text style={styles.subText}>mins</Text>
            </View>
          </ImageBackground>
        </MapView.Marker>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 84,
    height: 84
  },
  mainText: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 15,
    paddingRight: 4
  },
  subText: {
    fontSize: 8,
    paddingRight: 2,
    paddingBottom: 25
  }
});

module.exports = RidePickup;
