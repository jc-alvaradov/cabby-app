import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default class GoogleLogin extends Component {
	constructor(props){
		super(props);
		this._signIn = this._signIn.bind(this);
		this._setupGoogleSignin = this._setupGoogleSignin.bind(this);
	}

   componentDidMount() {
   	this._setupGoogleSignin();
   }

	render() {
		return (
   		<GoogleSigninButton 
   			style={{width: 250, height: 55}} 
   			color={GoogleSigninButton.Color.Light} 
   			size={GoogleSigninButton.Size.Wide} 
            onPress={this._signIn}
   		/>
    	);
  	}

  	_signIn() {
  		GoogleSignin.signIn()
    	.then((user) => {
      	alert('sucess! ' + user);
    	})
    	.catch((err) => {
      	alert('WRONG SIGNIN ' +  err);
    	})
    	.done();
  	}
	
	async _setupGoogleSignin() {
		try {
	   	await GoogleSignin.hasPlayServices({ autoResolve: true });
	   	await GoogleSignin.configure({
	     		webClientId: '950919118661-9sjumt2chiuf888t2rm5637qo01ijpm3.apps.googleusercontent.com',
	     		offlineAccess: false
	   	});
	 	}
	 	catch(err) {
	   	console.log("Play services error", err.code, err.message);
	 	}
	}
}