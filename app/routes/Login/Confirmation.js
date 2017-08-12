import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, TouchableOpacity } from 'react-native';
import PhoneInput from 'react-native-phone-input';

export default class Confirmation extends Component {
   render() {
      return (
         <View style={styles.container}>
            <View style={styles.form}>
               <Text style={styles.header}>Name</Text>
               <TextInput
                  style={styles.input}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  defaultValue="Juan Carlos"
               />
               <Text style={styles.header}>Email</Text>
               <TextInput
                  style={styles.input}
                  underlineColorAndroid='rgba(0,0,0,0)'
               />
               <Text style={styles.header}>Phone Number</Text>
               <PhoneInput 
                  ref='phone'
                  textStyle={{fontSize: 15}}
                  flagStyle={{width: 50, height: 30, borderWidth:0}}
               />
               <Text style={styles.header}>Payment Method</Text>
               <Picker selectedValue="Cash">
                 <Picker.Item label="Cash" value="cash" />
                 <Picker.Item label="Paypal" value="paypal" />
               </Picker>
            </View>
            <TouchableOpacity 
               onPress={() => console.log("Continuar")}
               style={styles.button}>
               <Text style={styles.text}>
                  Continue
               </Text>
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
   }, 
   form: {
      width: 300
   }, 
   button:{
      alignItems: 'center', 
      justifyContent: 'center', 
      width: 180,
      height: 55,
      borderRadius: 50,
      backgroundColor: '#1ca68a',
      elevation: 3
   },
   input:{
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#bdbdbd',
      backgroundColor: 'white',
      height: 40,
      elevation: 0.8
   },
   text: {
      color: 'white',
      fontSize: 18
   }, 
   header: {
      fontSize: 16,
      marginBottom: 5
   }
});

/*
               <TextInput
                  style={styles.input}
                  keyboardType='numeric'
                  underlineColorAndroid='rgba(0,0,0,0)'
                  maxLength={10}
                
               />


*/