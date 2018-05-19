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
import axios from 'axios';
import { StackNavigator } from 'react-navigation';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginButton from './lib/LoginButton';
import HomeScreen from './HomeScreen';
import RootNavigation from '../navigation/RootNavigation';
import resources from './data/resources.json';
import languages from './data/languages.json';
import hostUrl from './data/url.json'


export default class Login extends Component {

    constructor(props) {
        super(props);
        // state contain username and passage
        this.state = {
            userName: '',
            password: ''
        }
    }

    // when press login, post username and password to folio, then get an unique token
    onPressCallback = () => {
        const data = JSON.stringify({
            username: this.state.userName,
            password: this.state.password,
        });
        const url = hostUrl.url + '/authn/login';
        console.log(url);
        // post username and password
        axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Okapi-Tenant': 'diku',
                },
            })
            // get a token then navigate to the TabNavigater with params
            .then((response) => {
                const tokenName = 'x-okapi-token';
                const okapi_token = response.headers[tokenName];
                const {
                    navigate
                } = this.props.navigation;
                navigate('MainTab', {
                    isLoggedIn: true,
                    token: okapi_token,
                    username: this.userName,
                    resources: resources,
                    languages: languages,
                });
            })
            .catch((error) => {
                Alert.alert(`${error}`);
            });
    };

    // if press forget password, show a message
    _handleforgetpassword = () => {
        Alert.alert('Please contact the library staff to help you reset password.');
    }


  render() {
    return (
      <KeyboardAwareScrollView style={LoginStyles.loginview}>
        <View style={{ flexDirection: 'row',
          height: 150,
          marginTop: 60,
          justifyContent: 'center',
          alignItems: 'flex-start' }}
        >
        <Image
          style={{ maxHeight: 210, maxWidth: 210 }}
          source={require('./image/login.png')}
        />
        </View>
          <View style={{ marginTop: 80 }}>
            <View style={LoginStyles.TextInputView}>
              <TextInput
                style={LoginStyles.TextInput}
                placeholder="Username"
                underlineColorAndroid={'transparent'}
                onChangeText={(text) => {
                  this.setState({
                    userName: text
                  })
                }}
              />
            </View>
            <View style={LoginStyles.TextInputView}>
              <TextInput
                style={LoginStyles.TextInput}
                placeholder="Password"
                secureTextEntry
                underlineColorAndroid={'transparent'}
                onChangeText={(text) => {
                  this.setState({
                    password: text
                  })
                }}
              />
            </View>
          <LoginButton name="Log in" onPressCallback={this.onPressCallback} />
          <TouchableOpacity onPress={this._handleforgetpassword} >
            <Text style={{ color: '#4A90E2', textAlign: 'right', marginTop: 10 }} >Forget password？</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
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
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: '#000000',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  TextInput: {
    backgroundColor: '#ffffff',
    height: 45,
    margin: 18,
  },
});
