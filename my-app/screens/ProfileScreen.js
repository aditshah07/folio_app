import React from 'react';
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
  AsyncStorage,
  ActivityIndicator,
  Switch,
  ScrollView,
  Dimensions,
  Button,
  TouchableHighlight
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar, FormLabel, FormInput, FormValidationMessage, Badge, Icon } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
import LoginButton from './lib/LoginButton';
import Collapsible from 'react-native-collapsible';
import axios from 'axios';

const window = Dimensions.get('window');

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
      title: 'My profile',
    };

    constructor(props){
      super(props);
      this.state = {isLoading: true, 
        isCollapsed:true, 
        isCollapsedContact:true, 
        isCollapsedExtended:true, 
        isCollapsedLoan:true, 
        id: '', 
        user:'', 
        personal:'', 
        firstName:'',
        metadata:'',
        proxy:''}
    }

   componentDidMount = () => {
    let url = "http://folio-testing-backend01.aws.indexdata.com:9130/users?query=username=" + this.props.navigation.state.params.username;
      axios.get(url, {
        headers: { 
          'X-Okapi-Tenant': 'diku',
          'X-Okapi-Token': this.props.navigation.state.params.token
        },
      })
      .then((responseJson) => {
        //console.log(responseJson.headers.get('x-okapi-user-id'));
        var userId = 'x-okapi-user-id';
        if (responseJson.status === 200) {
          this.setState({
            id: responseJson.headers[userId],
          })
        } else {
          Alert.alert("Something went wrong 1");
        }
      })
      .then(() =>{
        let urlForUserInfo = "http://folio-testing-backend01.aws.indexdata.com:9130/users/" + this.state.id;
        axios.get(urlForUserInfo, {
          headers: { 
            'X-Okapi-Tenant': 'diku',
            'X-Okapi-Token': this.props.navigation.state.params.token
          },
        })
        .then((responseJson) => {
           console.log(responseJson);
           if (responseJson.status === 200) {
              var responseBody = responseJson.data;
              var fname = responseBody.personal.firstName;
              //console.log(fname);
              this.setState({
                isLoading: false,
                body: responseBody,
                firstName: fname,
                lastName: responseBody.personal.lastName,
                email: responseBody.personal.email,
                address: responseBody.personal.addresses[0],
                username: responseBody.username,
                active: responseBody.active,
                metadata: responseBody.metadata,
                proxy: responseBody.proxy
                //personal: JSON.parse(responseBody)
             })
           } else {
              Alert.alert("Something went wrong");
           }
        })
      })
      .then(() => {
        let urlForUserInfo = "http://folio-testing-backend01.aws.indexdata.com:9130/users?query=username=" + this.props.navigation.state.params.username;
        axios.get(urlForUserInfo, {
          headers: { 
            'X-Okapi-Tenant': 'diku',
            'X-Okapi-Token': this.props.navigation.state.params.token
          },
        })
        .then((responseJson) => {
          if (responseJson.status === 200) {
            console.log("success");
          } else {
            Alert.alert("Something went wrong 3");
          }
        })
      })
      .catch((error) => {
         console.error(error);
      });
   }

   onFirstNameChanged(input) {
      this.setState({
        firstName: input,
      })
   }

   onLastNameChanged(input) {
      this.setState({
        lastName: input,
      })
   }

   onEmailChanged(input) {
      this.setState({
        email: input,
      })
   }

   onUserNameChanged(input) {
      this.setState({
        username: input,
      })
   }

   onAddressChanged(input) {
      this.setState({
        address: input,
      })
   }

   updateUserInfo(){

   }
   /*  "personal": {
    "lastName": "Handey",
    "firstName": "Jack",
    "email": "jhandey@biglibrary.org",
    "phone": "2125551212"
  }*/
   onPressCallback = () => {

    let url = "http://folio-testing-backend01.aws.indexdata.com:9130/users/" + this.state.id;
    let body = JSON.stringify({
      "username": this.state.username,
      "id": this.state.id,
      "active": this.state.active,
      "metadata":this.state.metadata,
      "proxy": this.state.proxy,
      "personal": {
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "email": this.state.email,
        "address":this.state.address
      }

    });
    axios.put(url, body, {
      headers: {
        'X-Okapi-Tenant': 'diku',
        'Content-Type': 'application/json', 
        "X-Okapi-Token": this.props.navigation.state.params.token
      }
    })
    .then( (response) => {
      console.log(response);
      if (responseJson.status === 200) {
        console.log("Successfully Updated profile");
      }
      else {
        Alert.alert("Error "+response.status);
        console.log(response);
      }
    })
  };

   setIsCollapsed(){
      var col = this.state.isCollapsed;
      if( col === false){
        col = true;
        this.setState({
          isCollapsed: col,
        });
      } else{
        col = false;
        this.setState({
          isCollapsed: col,
        });
      }
   }

   setIsCollapsedContact(){
      var col = this.state.isCollapsedContact;
      if( col === false){
        col = true;
        this.setState({
          isCollapsedContact: col,
        });
      } else{
        col = false;
        this.setState({
          isCollapsedContact: col,
        });
      }
   }

   setIsCollapsedExtended(){
      var col = this.state.isCollapsedExtended;
      if( col === false){
        col = true;
        this.setState({
          isCollapsedExtended: col,
        });
      } else{
        col = false;
        this.setState({
          isCollapsedExtended: col,
        });
      }
   }

   setIsCollapsedLoan(){
      var col = this.state.isCollapsedLoan;
      if( col === false){
        col = true;
        this.setState({
          isCollapsedLoan: col,
        });
      } else{
        col = false;
        this.setState({
          isCollapsedLoan: col,
        });
      }
   }

   render() {
      //console.log(this.state.personal.firstname);
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }

      var img = this.state.isCollapsed ?  require('./image/arrow_right.png') : require('./image/arrow_down.png');
      var img1 = this.state.isCollapsedContact ?  require('./image/arrow_right.png') : require('./image/arrow_down.png');
      var img2 = this.state.isCollapsedExtended ?  require('./image/arrow_right.png') : require('./image/arrow_down.png');
      var img3 = this.state.isCollapsedLoan ?  require('./image/arrow_right.png') : require('./image/arrow_down.png');

      return (
        <KeyboardAwareScrollView style={{backgroundColor: '#ffffff'}}>
            <View style={styles.containerStyle}>
              <View style = {{backgroundColor: '#f4f4f4'}}>
                  <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                      <Image style={{maxHeight: 210, maxWidth: 210}} 
                        source={require('./image/login.png')}/>
                  </View>
              </View>


              <View style={{marginTop:20, flexDirection: 'row', height: 50, backgroundColor: '#f4f4f4', borderWidth: 0.5, borderColor: 'black'}}>
                <View style={{marginLeft:18}}>
                  <Avatar
                    small
                    round
                    source={img}
                    overlayContainerStyle={{backgroundColor: '#f4f4f4', marginTop:14}}
                    onPress={() => {this.setIsCollapsed()}}
                  />
                </View>

                <View style={{marginTop:13, }}>
                  <Text style = {{fontSize:18, textAlign: 'center'}}> User Info: </Text>
                </View>
                <View style = {{flexDirection: 'row', justifyContent: 'flex-end', flex:1, marginRight:18, alignItems: 'center'}}>

                  <TouchableHighlight
                     onPress={this.onPressCallback}>
                   <Text style = {{color:'#3281DD'}}> update </Text>
                  </TouchableHighlight>

                </View>

              </View>

              <Collapsible collapsed={this.state.isCollapsed}>
                <View>
                  <FormLabel labelStyle={[styles.defaultMargin, {marginTop: 20, fontSize: 13, fontWeight: '400'}]}>
                      First Name:
                  </FormLabel>

                  <FormInput
                      style ={{height: 0}}
                      containerStyle={styles.defaultMargin}
                      selectionColor = { '#000' }
                      inputStyle={{color: '#000'}}
                      value={this.state.firstName}
                      onChangeText={(value) => this.onFirstNameChanged(value)} 
                  />

                  <FormLabel labelStyle={[styles.defaultMargin, {marginTop: 20, fontSize: 13, fontWeight: '400'}]}>
                  Last Name:
                  </FormLabel>

                  <FormInput
                    containerStyle={styles.defaultMargin}
                    selectionColor = { '#000' }
                    inputStyle={{color: '#000'}}
                    value={this.state.lastName}
                    onChangeText={(value) => this.onLastNameChanged(value)} 
                  />

                  <FormLabel labelStyle={[styles.defaultMargin, {marginTop: 20, fontSize: 13, fontWeight: '400'}]}>
                      User Name:
                  </FormLabel>

                  <FormInput
                      containerStyle={styles.defaultMargin}
                      selectionColor = { '#000' }
                      inputStyle={{color: '#000'}}
                      value={this.state.username}
                      onChangeText={(value) => this.onUserNameChanged(value)} 
                  />

                  <View style={{flexDirection: 'row', marginTop: 20, marginBottom:20}}>
                      <FormLabel labelStyle={[{marginTop: 7, fontSize: 13, fontWeight: '400'}]}>
                          Active:
                      </FormLabel>
                      <Switch
                        style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }]}}
                        value = {this.state.active}
                        onTintColor='#3281DD'/>
                  </View>
                  <FormValidationMessage labelStyle={{marginLeft: 14}}>
                  {this.props.error}
                  </FormValidationMessage>
                </View>

              </Collapsible>
              
              <View style={{flexDirection: 'row', height: 50, backgroundColor: '#f4f4f4', borderWidth: 0.5, borderColor: 'black'}}>
                <View style={{marginLeft:18}}>
                  <Avatar
                    small
                    round
                    source={img1}
                    overlayContainerStyle={{backgroundColor: '#f4f4f4', marginTop:14}}
                    onPress={() => {this.setIsCollapsedContact()}}
                  />
                </View>
                <View style={{marginTop:13 }}>
                  <Text style = {{fontSize:18, textAlign: 'center'}}> Contact Info: </Text>
                </View>

                <View style = {{flexDirection: 'row', justifyContent: 'flex-end', flex:1, marginRight:18, alignItems: 'center'}}>

                  <TouchableHighlight
                     onPress={this.onPressCallback}>
                   <Text style = {{color:'#3281DD'}}> update </Text>
                  </TouchableHighlight>

                </View>

              </View>
              <Collapsible collapsed={this.state.isCollapsedContact}>
                <View style={{margin:20, marginTop:0, marginLeft: 0, marginRight: 0}}>
                  <FormLabel labelStyle={{ marginLeft: 18, marginRight: 18, fontSize: 13, fontWeight: '400'}}>
                      Email:
                  </FormLabel>
                  <FormInput
                      containerStyle={styles.defaultMargin}
                      selectionColor = { '#000' }
                      inputStyle={{color: '#000'}}
                      value={this.state.email}
                      onChangeText={(value) => this.onEmailChanged(value)} 
                  />
                  <FormValidationMessage labelStyle={{marginLeft: 14}}>
                  {this.props.error}
                  </FormValidationMessage>
                </View>
              </Collapsible>


              <View style={{flexDirection: 'row', height: 50, backgroundColor: '#f4f4f4', borderWidth: 0.5, borderColor: 'black'}}>
                <View style={{marginLeft:18}}>
                  <Avatar
                    small
                    round
                    source={img2}
                    overlayContainerStyle={{backgroundColor: '#f4f4f4', marginTop:14}}
                    onPress={() => {this.setIsCollapsedExtended()}}
                  />
                </View>
                <View style={{marginTop:13, }}>
                  <Text style = {{fontSize:18, textAlign: 'center'}}> Extended Info: </Text>
                </View>
                <View style = {{flexDirection: 'row', justifyContent: 'flex-end', flex:1, marginRight:18, alignItems: 'center'}}>

                  <TouchableHighlight
                     onPress={this.onPressCallback}>
                   <Text style = {{color:'#3281DD'}}> update </Text>
                  </TouchableHighlight>

                </View>

              </View>

              <Collapsible collapsed={this.state.isCollapsedExtended}>
                <FormLabel labelStyle={[styles.defaultMargin, {marginTop: 20, fontSize: 13, fontWeight: '400'}]}>
                    Address:
                </FormLabel>
                <View style={{margin:20, marginTop:0, marginLeft: 0, marginRight: 0}}>
                  <FormInput
                      containerStyle={styles.defaultMargin}
                      selectionColor = { '#000' }
                      inputStyle={{color: '#000'}}
                      value={this.state.adress}
                      onChangeText={(value) => this.onAddressChanged(value)} 
                  />
                  <FormValidationMessage labelStyle={{marginLeft: 14}}>
                  {this.props.error}
                  </FormValidationMessage>
                </View>
              </Collapsible>


              <View style={{flexDirection: 'row', height: 50, backgroundColor: '#f4f4f4', borderWidth: 0.5, borderColor: 'black'}}>
                <View style={{marginLeft:18}}>
                  <Avatar
                    small
                    round
                    source={img3}
                    overlayContainerStyle={{backgroundColor: '#f4f4f4', marginTop:14}}
                    onPress={() => {this.setIsCollapsedLoan()}}
                  />
                </View>
                <View style={{marginTop:13}}>
                  <Text style = {{fontSize:18, textAlign: 'center'}}> Open Loans </Text>
                </View>
              </View>

              <Collapsible collapsed={this.state.isCollapsedLoan}>
                <View style={{margin:20, marginTop:0, marginLeft: 0, marginRight: 0}}>
                
                </View>
              </Collapsible>

            </View>
          </KeyboardAwareScrollView>
        )
   }
}

const styles = StyleSheet.create({
  containerStyle: {
        backgroundColor: '#fff', 
        flex: 1
    },
    defaultMargin: {
        marginLeft: 18, 
        marginRight: 18
    }
});
