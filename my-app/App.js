import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AppRegistry } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import Login from './screens/LoginScreen';

import { StackNavigator } from 'react-navigation';

export default StackNavigator({
  Root: { screen: RootNavigation },
  Login: { screen: Login },
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteParams: {
      isLoggedIn: false,
      token: '',
    }
  }
);


