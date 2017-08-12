import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
      	<View style={styles.container}>
        		<Text style={styles.title}>Taxi Native</Text>
        		<View style={styles.login}>
          		<Text style={styles.text}>Please login to continue</Text>
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
    	alignItems: 'center'
  	},
  	login: {
    	backgroundColor: 'white', 
    	borderRadius: 10,
    	width: 'auto',
    	height: 'auto',
    	padding: 20
 	},
  	title: {
    	fontFamily: 'Allan-Bold',
    	color: 'white',
    	fontSize: 55,
    	marginTop: 100,
    	marginBottom: 50 
  	},
  	text: {
  		fontSize: 16,
  		fontWeight: 'bold',
  		textAlign: 'center',
  		marginBottom: 10
  	}
});