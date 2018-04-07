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


class App extends React.Component {

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return ( 
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          <RootNavigation />
        </View> 
      );  
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
