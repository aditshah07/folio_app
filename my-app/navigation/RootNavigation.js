import { Notifications, AppLoading, Asset, Font } from 'expo';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import Login from '../screens/LoginScreen';


const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      //params: navigation.state.params,
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  },

);


export default class RootNavigation extends Component {

  constructor(props) {
    super(props);

  }
  
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {

    const { params } = this.props.navigation.state;
    console.log(params.token);

    if (params.isLoggedIn) {

      return <RootStackNavigator screenProps={{prevNav:this.props.navigation}}/>;
    }
    else {
      return <Login navigation={this.props.navigation}/>;
    } 

  }


  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
  

}
