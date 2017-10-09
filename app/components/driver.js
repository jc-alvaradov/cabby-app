import React from "react";
import { View, Animated } from "react-native";
import MapView from "react-native-maps";

class Driver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinate: new MapView.AnimatedRegion({
        latitude: this.props.coordinate.latitude,
        longitude: this.props.coordinate.longitude
      }),
      rotation: "360deg"
    };
  }

  calculareRotation(lat1, long1, lat2, long2) {
    // https://stackoverflow.com/questions/3932502/calculate-angle-between-two-latitude-longitude-points
    const dLon = long2 - long1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let brng = Math.atan2(y, x);

    brng = brng * (180 / Math.PI);
    brng = (brng + 360) % 360;
    brng = 360 - brng;
    return brng;
  }

  componentWillReceiveProps(nextProps) {
    // se actualiza desps de recibir la nueva posicion, podria ser muy inexacto.
    // se actualiza la posicion cada 3 segundos, la idea es evitar los saltos bruscos
    // entre una posicion horizontal y una vertical por ejemplo que podria ocurrir
    // dentro de los 3 segundos
    if (this.props.coordinate !== nextProps.coordinate) {
      const newRotation =
        this.calculareRotation(
          this.props.coordinate.latitude, // posicion actual
          this.props.coordinate.longitude,
          nextProps.coordinate.latitude, // proxima posicion
          nextProps.coordinate.longitude
        ) + "deg";
      this.setState({
        rotation: newRotation
      });
      this.state.coordinate
        .timing({
          ...nextProps.coordinate,
          duration: 3000
        })
        .start();
    }
  }
  render() {
    return (
      <MapView.Marker.Animated
        coordinate={this.state.coordinate}
        image={require("../images/car-top.png")}
        style={{ transform: [{ rotate: this.state.rotation }] }}
      />
    );
  }
}

export default Driver;
