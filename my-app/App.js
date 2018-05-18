import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RootNavigation from './navigation/RootNavigation';
import MainTab from './navigation/MainTabNavigator';
import Login from './screens/LoginScreen';
import Book from './screens/BookScreen';
import resources from './screens/data/resources.json';
import languages from './screens/data/languages.json';

export default StackNavigator({
  Root: { screen: RootNavigation },
  Login: { screen: Login },
  MainTab: { screen: MainTab },
  Book: { screen: Book },
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
  initialRouteParams: {
    isLoggedIn: false,
    resources: resources,
    languages: languages,
    token: '',
  },
});

