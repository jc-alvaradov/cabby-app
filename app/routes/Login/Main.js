import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Styles from './styles';

//import FacebookLogin from '../../components/fbButton';
//import GoogleLogin from '../../components/googleButton';

/*
"react-native-vector-icons"
"react-native fbsdk, react-native-google-signin"

              <FacebookLogin />
              <GoogleLogin />
*/

export default class Main extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={Styles.mainContainer}>
        <Text style={Styles.title}>Taxi Native</Text>
        <View style={Styles.login}>
          <Text style={Styles.headText}>Please login to continue</Text>
        </View>
      </View>
    );
  }
}