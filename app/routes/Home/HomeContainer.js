import React from "react";
import { connect } from "react-redux";
import NavIcon from "react-native-vector-icons/Ionicons";
import Loading from "../../components/loading";
import Home from "./home";

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientImg: undefined,
      position: {
        latitude: 0,
        longitude: 0
      },
      cars: [
        {
          key: "asdasd33k3kk!",
          position: {
            latitude: -33.112237,
            longitude: -71.569072
          }
        },
        {
          key: "lksksksks!!",
          position: {
            latitude: -33.142007,
            longitude: -71.575885
          }
        }
      ]
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
  getCars() {
    // hace una peticion get al servidor para que le envie un array con todos los conductores activos
    // cada objeto del array(conductor) tiene 2 atributos: position(latitude y longitude) y un key
    /* 
    const cars = axios.get
    if(cars != undefined){
      this.setState({cars});
    }
    
    subscribirse a la lista de autos
  

    */
  }
  render() {
    const render =
      this.state.position.latitude === 0 ? (
        <Loading />
      ) : (
        <Home
          user={this.props.store.user}
          position={this.state.position}
          cars={this.state.cars}
          clientImg={this.state.clientImg}
          ciudad={this.props.store.ciudad}
          navigation={this.props.navigation}
        />
      );
    return render;
  }
}

HomeContainer.navigationOptions = {
  header: null
};

function mapStateToProps(state) {
  return {
    store: state
  };
}

export default connect(mapStateToProps)(HomeContainer);
