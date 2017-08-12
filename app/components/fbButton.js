import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FacebookLogin extends Component {
	constructor(props){
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this._responseInfoCallback = this._responseInfoCallback.bind(this);
	}
	render(){
		return(
			<Icon.Button 
		  		name="facebook" 
		  		style={styles.button} 
		  		onPress={this.handleLogin}>
		  		Login with Facebook
		  	</Icon.Button>
		);
	}

	_responseInfoCallback(error: ?Object, result: ?Object) {
		if (error) {
	    	alert('Error fetching data: ' + error.toString());
	  } else {
	    	alert('Email: ' + JSON.stringify(result.email));
	  	}
	}

	handleLogin(){
		LoginManager.logInWithReadPermissions(['email']).then(
	  		(result)  => {
	    		if (result.isCancelled) {
	      			console.log('Login cancelled')
	    		} else {
	    		// successful login
					const infoRequest = new GraphRequest('/me',
					{
						httpMethod: 'GET',
						version: 'v2.5',
						parameters: {
							'fields': {
						    	'string' : 'email, name, friends'
						    }
						}
					}, this._responseInfoCallback,);    
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
		backgroundColor: "#3b5998",
		width: 250,
		height: 55
	}
});