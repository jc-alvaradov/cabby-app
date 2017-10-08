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
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    }, null);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
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
