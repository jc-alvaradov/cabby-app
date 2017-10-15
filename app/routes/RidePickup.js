import React, { PropTypes } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView from "react-native-maps";

const propTypes = {
  show: PropTypes.bool.isRequired
};

const defaultProps = {
  show: false
};

class RidePickup extends React.Component {
  constructor(props) {
    super(props);
    /** 
     * this initialRender state makes sure that the icon loads two times, is a hack for an issue with react native maps
     * https://github.com/airbnb/react-native-maps/issues/924
     */
    this.state = {
      initialRender: true
    };
  }

  render() {
    const { show } = this.props;
    if (show) {
      return (
        <MapView.Marker
          coordinate={this.props.coordinate}
          key="arrivalTimeMarker"
        >
          <Image
            style={styles.container}
            source={require("../images/ride_pickup.png")}
            onLayout={() => this.setState({ initialRender: false })}
            key={`${this.state.initialRender}`}
          >
            <View style={styles.textContainer}>
              <Text style={styles.mainText}>8</Text>
              <Text style={styles.subText}>mins</Text>
            </View>
          </Image>
        </MapView.Marker>
      );
    } else {
      return null;
    }
  }
}

RidePickup.propTypes = propTypes;
RidePickup.defaultProps = defaultProps;

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
