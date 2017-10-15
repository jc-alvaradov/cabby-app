import React from "react";
import Loading from "../../components/loading";
import Home from "./home";

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        latitude: 0,
        longitude: 0
      }
    };
  }

  componentDidMount() {
    // obtiene la posicion actual del usuario
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    }, null);
  }

  render() {
    const render =
      this.state.position.latitude === 0 ? (
        <Loading />
      ) : (
        <Home
          position={this.state.position}
          navigation={this.props.navigation}
        />
      );
    return render;
  }
}

HomeContainer.navigationOptions = {
  header: null
};

export default HomeContainer;
