import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { LoginManager } from 'react-native-fbsdk'
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FacebookLogin extends Component {
	constructor(props){
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this._responseInfoCallback = this._responseInfoCallback.bind(this);
	}
	render(){
			return(
			  <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.handleLogin}>
			  	Login with Facebook
			  </Icon.Button>
			);
	}

	_responseInfoCallback(error: ?Object, result: ?Object) {
	  if (error) {
	    alert('Error fetching data: ' + error.toString());
	  } else {
	    alert('Success fetching data: ' + JSON.stringify(result));
	  }
	}

	handleLogin(){
		LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
	  		(result)  => {
	    		if (result.isCancelled) {
	      			console.log('Login cancelled')
	    		} else {
	    			// successful login
						const infoRequest = new GraphRequest('/me', null, this._responseInfoCallback,);    
						new GraphRequestManager().addRequest(infoRequest).start();
	    		}
	  		},
	  		(error) => {
	    		console.log('Login fail with error: ' + error)
	  		}
		)
	}
}

const styles = StyleSheet.create({
	button:{
		backgroundColor: "#4267B2"
	}
});