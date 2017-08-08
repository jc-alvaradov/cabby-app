import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FacebookLogin from '../../components/fbButton';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Taxi Native</Text>
        <View style={styles.login}>
          <Text>Please login to continue</Text>
        	<FacebookLogin />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1ca68a',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  login: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 'auto',
    height: 'auto',
    padding: 10
  },
  title: {
    fontFamily: 'Allan-Bold',
    color: 'white',
    fontSize: 55,
    marginTop: 100,
    marginBottom: 50
  }
});