import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StarRating from "react-native-star-rating";
import Button from "../components/basicButton";
import { rideNav } from "../actions/ride_nav";
import { cleanStart, cleanFinish } from "../actions/ride_position";
import { showIcons } from "../actions/show_icons";
import { saveDriver } from "../actions/save_driver";
import { graphRequest } from "../lib/graphRequest";
import styles from "./styles";

class FinishedRide extends React.Component {
  static propTypes = {
    driver: PropTypes.object.isRequired
  };
  static defaultProps = { driver: {} };

  state = {
    starCount: 0
  };

  rateRide = rating => {
    this.setState({ starCount: rating });
  };

  finishAndRate = async () => {
    // aqui tenemos que limpiar todo el estado referente a el ride,
    // tenemos que guardar en la base de datos una foto del ride completo
    // hay que mandar una peticion graphql de agregar un rating al ride que tiene este rideId
    const query = {
      query: "mutation ($rating: RatingInput!) { addRating(rating: $rating) }",
      variables: {
        rating: {
          fromId: this.props.user._id,
          toId: this.props.driver._id,
          //message: "Buen conductor, el auto estaba limpio.",
          rating: this.state.starCount
        }
      }
    };
    // revisar que haya internet conectado
    const res = await graphRequest(query, "addRating");
    this.props.cleanStart();
    this.props.cleanFinish();
    this.props.saveDriver({});
    this.props.rideNav("hidden");
    this.props.showIcons(true);
  };

  cancelRide = () => {
    // se devuelve al menu principal
    // limpiar driver
    this.props.cleanStart();
    this.props.cleanFinish();
    this.props.saveDriver({});
    this.props.rideNav("hidden");
    this.props.showIcons(true);
  };

  render() {
    const { driver } = this.props;
    return (
      <View style={styles.rideApp}>
        <View style={styles.headerTitle}>
          <Text style={styles.rideStatus}>Finished Trip</Text>
          <Text>Please rate your driver</Text>
        </View>
        <View style={styles.finishedContainer}>
          <View style={styles.rideInfo}>
            <Image style={styles.driverPhoto} source={{ uri: driver.photo }} />
            <View style={styles.driverInfo}>
              <Text style={styles.bold} numberOfLines={1}>
                {driver.driverName}
              </Text>
              <Text numberOfLines={1}>{driver.carModel}</Text>
              <Text style={styles.carPlate}>{driver.carPlate}</Text>
            </View>
            <Image
              style={{ width: 60, height: 60, borderRadius: 30 }}
              source={{ uri: driver.carPhoto }}
            />
          </View>
          <View style={styles.ridePriceContainer}>
            <Text style={styles.ridePrice}>Total: $5.321</Text>
          </View>
          <View style={styles.starContainer}>
            <StarRating
              maxStars={5}
              starColor="#1ca68a"
              rating={this.state.starCount}
              starSize={35}
              selectedStar={rating => this.rateRide(rating)}
            />
          </View>
          <View style={styles.rideBtn}>
            <Button
              style={styles.pickupBtn}
              text="Cancel"
              btnStyle="inline"
              onTouch={() => this.cancelRide()}
            />
            <Button
              style={styles.pickupBtn}
              text="Rate Ride"
              btnStyle="inline"
              onTouch={() => this.finishAndRate()}
            />
          </View>
        </View>
      </View>
    );
  }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      rideNav,
      saveDriver,
      showIcons,
      cleanStart,
      cleanFinish
    },
    dispatch
  );
};

mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishedRide);
