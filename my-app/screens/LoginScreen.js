import React, { Component } from 'react';
import {
  Alert,
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform, 
  StatusBar,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginButton from './lib/LoginButton';
import HomeScreen from './HomeScreen';
import RootNavigation from '../navigation/RootNavigation';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.userName = "";
    this.password = "";

  }
  
  render() {
    return (

      <KeyboardAwareScrollView style={LoginStyles.loginview}>
        <View style={{flexDirection: 'row',height:150,marginTop:60,
          justifyContent: 'center',
          alignItems: 'flex-start'}}>
          <Image style={{maxHeight: 210, maxWidth: 210}} 
            source={require('./image/login.png')}/>
        </View>
        <View style={{marginTop:80}}> 
           
          <View style={LoginStyles.TextInputView}>
            <TextInput style={LoginStyles.TextInput} 
              placeholder='Username'
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => {
                this.userName = text;
            }}/>
          </View>
          <View style={LoginStyles.TextInputView}>
            <TextInput style={LoginStyles.TextInput} 
              placeholder='Password'
              secureTextEntry={true}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => {
                this.password = text;
            }}/>
          </View>
           
           
          <LoginButton name='Log in' onPressCallback={this.onPressCallback}/>

          <Text style={{color:"#4A90E2",textAlign:'right',marginTop:10}} >Forget password？</Text>
        </View>
      </KeyboardAwareScrollView>
    )
  }


  onPressCallback = () => {

    var fetchOptions = {
      method: 'POST',
      headers: {'X-Okapi-Tenant': 'diku', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        "username": this.userName,
        //"userId": "diku", useless
        "password": this.password
      })
    }


    let url = "http://folio-testing-backend01.aws.indexdata.com:9130/authn/login";
    fetch(url, fetchOptions)
    .then( (response) => {
      if (response.status === 201) {
        const okapi_token = response.headers.get('X-Okapi-Token');
        
        const { navigate } = this.props.navigation;
        navigate('Root', { isLoggedIn: true, token: okapi_token });
      }
      else {
        Alert.alert("Error "+response.status);

      }
    })
  };

}


const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
      backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  TextInputView: {
    marginTop: 10,
    height:50,
    backgroundColor: '#ffffff',
    borderRadius:5,
    borderWidth:0.3,
    borderColor:'#000000',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  TextInput: {
    backgroundColor: '#ffffff',
    height:45,
    margin:18,
  },
});
