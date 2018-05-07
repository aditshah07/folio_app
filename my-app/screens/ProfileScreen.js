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
  TouchableHighlight,
  FlatList
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar, FormLabel, FormInput, FormValidationMessage, Badge, Icon, CheckBox } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
import LoginButton from './lib/LoginButton';
import DatePicker from 'react-native-datepicker'
import Collapsible from 'react-native-collapsible';
import axios from 'axios';



export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'My profile',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isCollapsed: true,
            isCollapsedContact: true,
            isCollapsedExtended: true,
            isCollapsedLoan: true,
            id: '',
            user: '',
            personal: '',
            firstName: '',
            lastName: '',
            username:'',
            email:'',
            metadata: '',
            proxy: '',
            dateOfBirth:'',
            loans: [],
            addressLine1: '',
            addressLine2: '',
            city: '',
            addressTypeId:'',
            postalCode: '',
            primaryAddress: false,
            patronGroup: '',
            phone: '',
            titles:[],
            type:'',
            body:{},
            imageUrls:[],
        }
    }

    componentDidMount = () => {
        var fetchOptions = {
            method: 'GET',
            headers: {
                'X-Okapi-Tenant': 'diku',
                'Content-Type': 'application/json',
                "X-Okapi-Token": this.props.screenProps.prevNav.state.params.token
            },
        }
        let url = "http://folio-testing-backend01.aws.indexdata.com:9130/users?query=username=" + this.props.screenProps.prevNav.state.params.username;
        axios(url, fetchOptions)
            .then((responseJson) => {
                //console.log(responseJson.headers.get('x-okapi-user-id'));
                if (responseJson.status === 200) {
                    this.setState({
                        id: responseJson.headers['x-okapi-user-id']
                    })
                } else {
                    Alert.alert("Something went wrong");
                }
            })
            .then(() => {
                let urlForUserInfo = "http://folio-testing-backend01.aws.indexdata.com:9130/users/" + this.state.id;
                axios(urlForUserInfo, fetchOptions)
                    .then((responseJson) => {
                        //console.log(responseJson);
                        if (responseJson.status === 200) {
                            var responseBody = responseJson.data;
                            //console.log(fname);
                            if (responseBody.personal.hasOwnProperty('firstName')) {
                                this.setState({
                                    firstName: responseBody.personal.firstName,
                                })
                            }
                            if (responseBody.personal.hasOwnProperty('lastName')) {
                                this.setState({
                                    lastName: responseBody.personal.lastName,
                                })
                            }
                            if (responseBody.personal.hasOwnProperty('dateOfBirth')) {
                                this.setState({
                                    dateOfBirth: responseBody.personal.lastName,
                                })
                            }
                            if (responseBody.personal.hasOwnProperty('email')) {
                                this.setState({
                                    email: responseBody.personal.email,
                                })
                            }
                            if (responseBody.personal.hasOwnProperty('addresses')) {
                                this.setState({
                                    address: responseBody.personal.addresses,
                                })
                            }
                            //this.forceUpdate();
                            if (this.state.address.length) {
                                var addressHome = this.state.address[0];
                                console.log(addressHome.addressLine1);
                                //var add = adds[0];
                                
                                if (addressHome.hasOwnProperty('addressLine1')) {
                                    this.setState({
                                        addressLine1: addressHome.addressLine1,
                                    })
                                }
                                if (addressHome.hasOwnProperty('addressLine2')) {
                                    this.setState({
                                        addressLine2: addressHome.addressLine2,
                                    })
                                }
                                if (addressHome.hasOwnProperty('city')) {
                                    this.setState({
                                        city: addressHome.city,
                                    })
                                }
                                if (addressHome.hasOwnProperty('addressTypeId')) {
                                    this.setState({
                                        addressTypeId: addressHome.addressTypeId,
                                    })
                                }
                                if (addressHome.hasOwnProperty('postalCode')) {
                                    this.setState({
                                        postalCode: addressHome.postalCode,
                                    })
                                }
                                if (addressHome.hasOwnProperty('primaryAddress')) {
                                    this.setState({
                                        primaryAddress: addressHome.primaryAddress,
                                    })
                                }
                                
                            } 

                            if (responseBody.personal.hasOwnProperty('dateOfBirth')) {
                                this.setState({
                                    dateOfBirth: responseBody.personal.dateOfBirth,
                                })
                            }
                            if (responseBody.personal.hasOwnProperty('phone')) {
                                this.setState({
                                    phone: responseBody.personal.phone,
                                })
                            }
                            if (responseBody.hasOwnProperty('active')) {
                                this.setState({
                                    active: responseBody.active,
                                })
                            }
                            if (responseBody.hasOwnProperty('username')) {
                                this.setState({
                                    username: responseBody.username,
                                })
                            }
                            if (responseBody.hasOwnProperty('metadata')) {
                                this.setState({
                                    metadata: responseBody.metadata,
                                })
                            }
                            if (responseBody.hasOwnProperty('type')) {
                                this.setState({
                                    type: responseBody.type,
                                })
                            }
                            if (responseBody.hasOwnProperty('proxyFor')) {
                                this.setState({
                                    proxy: responseBody.proxyFor,
                                })
                            }
                            if (responseBody.hasOwnProperty('patronGroup')) {
                                this.setState({
                                    patronGroup: responseBody.patronGroup,
                                })
                            }

                            this.setState({
                                isLoading: false,
                                body: responseBody,
                            })
                        } else {
                            Alert.alert("Something went wrong");
                        }
                        return this.state;
                    })
                    

            })
            .then(() => {
                    let url = "http://folio-testing-backend01.aws.indexdata.com:9130/loan-storage/loans?query=username=" + this.props.screenProps.prevNav.state.params.username;
                    axios(url, fetchOptions)
                        .then((responseJson) => {
                            //console.log(responseJson);
                            var responseBody = responseJson.data;
                            this.setState({
                                loans: [{
                                    "id": "cf23adf0-61ba-4887-bf82-956c4aae2260",
                                    "userId": "df7f4993-8c14-4a0f-ab63-93975ab01c76",
                                    "proxyUserId": "346ad017-dac1-417d-9ed8-0ac7eeb886aa",
                                    "itemId": "23f2c8e1-bd5d-4f27-9398-a688c998808a",
                                    "loanDate": "2017-03-01T22:34:11-04:00",
                                    "dueDate": "2017-04-15T22:34:11-04:00",
                                    "status": {
                                        "name": "Open"
                                    },
                                    "action": "renewed",
                                    "itemStatus": "Checked out",
                                    "renewalCount": 1
                                }, {
                                    "id": "1d09af65-aeaa-499c-80cb-d52847b75a60",
                                    "userId": "15054e48-03e8-4ed5-810b-7192b86accab",
                                    "itemId": "d6f7c1ba-a237-465e-94ed-f37e91bc64bd",
                                    "loanDate": "2017-01-14T19:14:36-01:00",
                                    "dueDate": "2017-01-29T19:14:36+00:00",
                                    "returnDate": "2017-01-16T09:15:23-01:00",
                                    "status": {
                                        "name": "Closed"
                                    },
                                    "action": "checkedin",
                                    "itemStatus": "Available"
                                },{
                                    "id": "cf23adf0-61ba-4887-bf82-956c4aae2260",
                                    "userId": "df7f4993-8c14-4a0f-ab63-93975ab01c76",
                                    "proxyUserId": "346ad017-dac1-417d-9ed8-0ac7eeb886aa",
                                    "itemId": "23f2c8e1-bd5d-4f27-9398-a688c998808a",
                                    "loanDate": "2017-03-01T22:34:11-04:00",
                                    "dueDate": "2017-04-15T22:34:11-04:00",
                                    "status": {
                                        "name": "Open"
                                    },
                                    "action": "renewed",
                                    "itemStatus": "Checked out",
                                    "renewalCount": 1
                                }, {
                                    "id": "1d09af65-aeaa-499c-80cb-d52847b75a60",
                                    "userId": "15054e48-03e8-4ed5-810b-7192b86accab",
                                    "itemId": "d6f7c1ba-a237-465e-94ed-f37e91bc64bd",
                                    "loanDate": "2017-01-14T19:14:36-01:00",
                                    "dueDate": "2017-01-29T19:14:36+00:00",
                                    "returnDate": "2017-01-16T09:15:23-01:00",
                                    "status": {
                                        "name": "Closed"
                                    },
                                    "action": "checkedin",
                                    "itemStatus": "Available"
                                }, {
                                    "id": "1d09af65-aeaa-499c-80cb-d52847b75a60",
                                    "userId": "15054e48-03e8-4ed5-810b-7192b86accab",
                                    "itemId": "d6f7c1ba-a237-465e-94ed-f37e91bc64bd",
                                    "loanDate": "2017-01-14T19:14:36-01:00",
                                    "dueDate": "2017-01-29T19:14:36+00:00",
                                    "returnDate": "2017-01-16T09:15:23-01:00",
                                    "status": {
                                        "name": "Closed"
                                    },
                                    "action": "checkedin",
                                    "itemStatus": "Available"
                                }]
                            })

                            //console.log(this.state.loans);
                            if (responseJson.status === 200) {
                                console.log("success");
                            } else {
                                Alert.alert("Something went wrong");
                            }
                            return this.state;
                        })

                    .then((state) => {

                        //console.log(state.loans[0]);
                        let url_folio = "http://folio-testing-backend01.aws.indexdata.com:9130/inventory/items/";
                        var urls = [];
                        for (var i = 0; i < state.loans.length; i++) {
                            urls[i] = "" + url_folio + state.loans[i].itemId;
                        }
                        if(urls.length) {
                          return Promise.all(
                            urls.map(url => axios(url, fetchOptions)
                              .then((response, ) => {
                                  if (response.status === 200) {
                                      var responseBody = response.data;
                                      this.state.titles.push({titleName:responseBody.title, id:responseBody.id});
                                      this.forceUpdate();
                                  } else {
                                      Alert.alert("Something Went Wrong");

                                  }
                              })
                              .catch((error) => {
                                console.error(error);
                              })
                            )
                          )
                          .then(() => {
                            var titles = state.titles;
                            var loan = state.loans;
                            for(var i = 0; i < titles.length; i++) {
                              for(var j = 0; j < loan.length; j++) {
                                if(titles[i].id == loan[j].itemId) {
                                  loan[j].title = titles[i].titleName;
                                }
                              }
                            }
                            this.state.loans = loan;
                            this.forceUpdate();

                          })
                        }
                        return this.state;
                    })
                    
                    .then((state) => {
                      var state1 = state;
                      let url = "http://folio-testing-backend01.aws.indexdata.com:9130/addresstypes?query=addressType=Home";
                        axios(url, fetchOptions)
                            .then((responseJson) => {
                                //console.log(responseJson);
                                var responseBody = responseJson.data;
                                //console.log(responseBody.addressTypes[0].id)
                                if (responseJson.status === 200) {
                                    this.setState({
                                        addressTypeId:responseBody.addressTypes[0].id
                                    })
                                } else {
                                    Alert.alert("Something went wrong");
                                }
                            })
                            return this.state;
                    })
                    .then((state) => {

                        //console.log(state.loans[0]);
                        let url_folio = "https://www.googleapis.com/books/v1/volumes?q=title=";
                        var urls = [];
                        for (var i = 0; i < state.loans.length; i++) {
                            urls[i] = "" + url_folio + state.loans[i].title;
                        }
                        console.log(urls.length);
                        if(urls.length) {
                          return Promise.all(
                            urls.map(url => axios.get(url)
                              .then((response) => {
                                  //console.log(url);
                                      
                                      var responseBody = response.data;
                                      //console.log(responseBody.items[0].volumeInfo.imageLinks.smallThumbnail);
                                      var pos = 0;

                                      for(var i = url.length-1; i > 0; i--) {
                                        if(url.charAt(i) === '='){
                                          pos = i;
                                          break;
                                        }
                                      }
                                      var title = url.substring(pos+1);
                                      //console.log(title);
                                      this.state.imageUrls.push({imageURL:responseBody.items[0].volumeInfo.imageLinks.smallThumbnail, title: title});
                                      this.forceUpdate();
                                  
                              })
                              .catch((error) => {
                                console.error(error);
                              })
                            )
                          )
                          .then(() => {
                            var imageUrls = this.state.imageUrls;
                            var loan = state.loans;
                            for(var i = 0; i < loan.length; i++) {
                              for(var j = 0; j < imageUrls.length; j++) {
                                if((loan[i].title).includes(imageUrls[j].title)) {
                                  console.log("inside");
                                  loan[i].imageURL = imageUrls[j].imageURL;
                                }
                              }
                            }
                            /*for(var i = 0; i < imageUrls.length; i++) {
                                  loan[i].imageURL = imageUrls[i].imageURL;
                              
                            }*/
                            console.log(loan[0]);
                            this.state.loans = loan;
                            this.forceUpdate();

                          })
                        }
                    })
                    .catch((error) => {
                        console.error(error);
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

   onPhoneNumberChanged(input) {
      this.setState({
        phone: input,
      })
   }

   onUserNameChanged(input) {
      this.setState({
        username: input,
      })
   }

   onAddressLine1Changed(input) {
      this.setState({
        addressLine1: input,
      })
   }

   onAddressLine2Changed(input) {
      this.setState({
        addressLine2: input,
      })
   }

   onCityChanged(input) {
      this.setState({
        city: input,
      })
   }

   onPostalCodeChanged(input) {
      this.setState({
        postalCode: input,
      })
   }

   onPrimaryAddressChanged(input) {
      this.setState({
        primaryAddress: input,
      })
   }

   onDateOfBirthChanged(input) {
      this.setState({
        dateOfBirth: input,
      })
   }

   onPressCallbackPersonalInfoUpdate = () => {

    let updateBody = this.state.body;

    updateBody.personal.firstName = this.state.firstName;
    updateBody.personal.lastName = this.state.lastName;
    updateBody.username = this.state.username;
    updateBody.personal.dateOfBirth = this.state.dateOfBirth;

    this.setState({
      body:updateBody 
    }) 

    var fetchOptions = {
      //method: 'PUT',
      headers: {'X-Okapi-Tenant': 'diku', 'Content-Type': 'application/json', "X-Okapi-Token": this.props.screenProps.prevNav.state.params.token},
      //body: JSON.stringify(updateBody)
    }
    var data = JSON.stringify(updateBody);

    let url = "http://folio-testing-backend01.aws.indexdata.com:9130/users/" + this.state.id;
    axios.put(url, data, fetchOptions)
    .then( (response) => {
      if (response.status === 204) {
        Alert.alert("Successfully Updated profile");
      }
      else {
        Alert.alert("Something went wrong");
      }
    })
    .catch((error) => {
        console.error(error);
    });
  };

  onPressCallbackExtendedInfoUpdate = () => {

    let updateBody = JSON.parse(JSON.stringify(this.state.body));

    if(updateBody.personal.addresses < 1)
      updateBody.personal.addresses = [{addressTypeId:""}];
    
    updateBody.personal.addresses[0].addressTypeId = this.state.addressTypeId;
    updateBody.personal.addresses[0].addressLine1 = this.state.addressLine1;
    updateBody.personal.addresses[0].addressLine2 = this.state.addressLine2;
    updateBody.personal.addresses[0].city = this.state.city;
    updateBody.personal.addresses[0].postalCode = this.state.postalCode;
    updateBody.personal.addresses[0].primaryAddress = this.state.primaryAddress;
    
   this.setState({
      body:updateBody 
    }) 

    var fetchOptions = {
      method: 'PUT',
      headers: {'X-Okapi-Tenant': 'diku', 'Content-Type': 'application/json', "X-Okapi-Token": this.props.screenProps.prevNav.state.params.token},
      
    }
    var data = JSON.stringify(updateBody)

    let url = "http://folio-testing-backend01.aws.indexdata.com:9130/users/" + this.state.id;
    axios.put(url, data, fetchOptions)
    .then( (response) => {
      //console.log(response);
      if (response.status === 204) {
        Alert.alert("Successfully Updated profile");
      }
      else {
        Alert.alert("Something went wrong");
      }
    })

  };

  onPressCallbackContactInfoUpdate = () => {

    let updateBody = this.state.body;
    updateBody.personal.email = this.state.email;
    updateBody.personal.phone = this.state.phone; 

    this.setState({
      body:updateBody 
    })

    var fetchOptions = {
      method: 'PUT',
      headers: {'X-Okapi-Tenant': 'diku', 'Content-Type': 'application/json', "X-Okapi-Token": this.props.screenProps.prevNav.state.params.token},
      body: JSON.stringify(updateBody)
    }

    var data = JSON.stringify(updateBody);

    let url = "http://folio-testing-backend01.aws.indexdata.com:9130/users/" + this.state.id;
    axios.put(url, data, fetchOptions)
    .then( (response) => {
      if (response.status === 204) {
        Alert.alert("Successfully Updated profile");
      }
      else {
        Alert.alert("Something went wrong");
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

   _keyExtractor = (item, index) => item.id;

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

                <View style={{marginTop:13, textAlign: 'center'}}>
                  <Text style = {{fontSize:18, textAlign: 'center'}}> User Info: </Text>
                </View>
                <View style = {{flexDirection: 'row', justifyContent: 'flex-end', flex:1, marginRight:18, alignItems: 'center'}}>

                  <TouchableHighlight
                     onPress={this.onPressCallbackPersonalInfoUpdate} underlayColor="white">
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

                  <View style={{flexDirection: 'row', marginTop: 20}}>
                      <FormLabel labelStyle={[{marginTop: 11, fontSize: 13, fontWeight: '400'}]}>
                          Date of Birth:
                      </FormLabel>
                      <DatePicker
                        style={{flex:2, marginRight:18}}
                        date={this.state.dateOfBirth}
                        mode="date"
                        placeholder="select date"
                        showIcon = {false}
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => {this.setState({dateOfBirth: date})}}
                      />
                  </View>

                  

                  <View style={{flexDirection: 'row', marginTop: 20}}>
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
                <View style={{marginTop:13, textAlign: 'center'}}>
                  <Text style = {{fontSize:18, textAlign: 'center'}}> Contact Info: </Text>
                </View>

                <View style = {{flexDirection: 'row', justifyContent: 'flex-end', flex:1, marginRight:18, alignItems: 'center'}}>

                  <TouchableHighlight
                     onPress={this.onPressCallbackContactInfoUpdate} underlayColor="white">
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
                  <FormLabel labelStyle={{ marginLeft: 18, marginRight: 18, fontSize: 13, fontWeight: '400'}}>
                      Phone Number:
                  </FormLabel>
                  <FormInput
                      containerStyle={styles.defaultMargin}
                      selectionColor = { '#000' }
                      keyboardType = 'numeric'
                      dataDetectorTypes = 'phoneNumber'
                      inputStyle={{color: '#000'}}
                      value={this.state.phone}
                      onChangeText={(value) => this.onPhoneNumberChanged(value)} 
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
                <View style={{marginTop:13, textAlign: 'center'}}>
                  <Text style = {{fontSize:18, textAlign: 'center'}}> Extended Info: </Text>
                </View>
                <View style = {{flexDirection: 'row', justifyContent: 'flex-end', flex:1, marginRight:18, alignItems: 'center'}}>

                  <TouchableHighlight
                     onPress={this.onPressCallbackExtendedInfoUpdate} underlayColor="white">
                   <Text style = {{color:'#3281DD'}}> update </Text>
                  </TouchableHighlight>

                </View>

              </View>

              <Collapsible collapsed={this.state.isCollapsedExtended}>
                <FormLabel labelStyle={[styles.defaultMargin, {marginTop: 20, fontSize: 13, fontWeight: '400'}]}>
                    Address Line 1:
                </FormLabel>
                <View style={{margin:20, marginTop:0, marginLeft: 0, marginRight: 0}}>
                  <FormInput
                      containerStyle={styles.defaultMargin}
                      selectionColor = { '#000' }
                      inputStyle={{color: '#000'}}
                      value={this.state.addressLine1}
                      onChangeText={(value) => this.onAddressLine1Changed(value)} 
                  />
                  <FormLabel labelStyle={[styles.defaultMargin, {marginTop: 20, fontSize: 13, fontWeight: '400'}]}>
                    Address Line 2:
                </FormLabel>
                  <FormInput
                      containerStyle={styles.defaultMargin}
                      selectionColor = { '#000' }
                      inputStyle={{color: '#000'}}
                      value={this.state.addressLine2}
                      onChangeText={(value) => this.onAddressLine2Changed(value)} 
                  />

                  <FormLabel labelStyle={[styles.defaultMargin, {marginTop: 20, fontSize: 13, fontWeight: '400'}]}>
                    City:
                </FormLabel>
                  <FormInput
                      containerStyle={styles.defaultMargin}
                      selectionColor = { '#000' }
                      inputStyle={{color: '#000'}}
                      value={this.state.city}
                      onChangeText={(value) => this.onCityChanged(value)} 
                  />

                  <FormLabel labelStyle={[styles.defaultMargin, {marginTop: 20, fontSize: 13, fontWeight: '400'}]}>
                    Postal Code:
                </FormLabel>
                  <FormInput
                      containerStyle={styles.defaultMargin}
                      selectionColor = { '#000' }
                      inputStyle={{color: '#000'}}
                      value={this.state.postalCode}
                      onChangeText={(value) => this.onPostalCodeChanged(value)} 
                  />

                  <View style={{flexDirection: 'row', marginTop: 20}}>
                      <FormLabel labelStyle={[{marginTop: 7, fontSize: 13, fontWeight: '400'}]}>
                          Primary Address:
                      </FormLabel>
                      <Switch
                        style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }]}}
                        value = {this.state.primaryAddress}
                        onValueChange={(value) => this.onPrimaryAddressChanged(value)} 
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
                    source={img3}
                    overlayContainerStyle={{backgroundColor: '#f4f4f4', marginTop:14}}
                    onPress={() => {this.setIsCollapsedLoan()}}
                  />
                </View>
                <View style={{marginTop:13, textAlign: 'center'}}>
                  <Text style = {{fontSize:18, textAlign: 'center'}}> Loans </Text>
                </View>
              </View>

              <Collapsible collapsed={this.state.isCollapsedLoan}>
                <View style={{flexDirection: 'column', margin:20, marginTop:0, marginLeft: 0, marginRight: 0}}>
                  <FlatList
                    data= {this.state.loans}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => <View style = {{flex: 1, flexDirection: 'row', marginLeft:10, marginRight:10, borderRadius:5, marginTop: 20,borderWidth: 0.5,borderColor: 'black', background: 'rgba(0,0,0,6)'}}>
                      <View>
                        <Image 
                          style={{width: 100, height: 150, marginTop:10, marginLeft:10, marginBottom:10}}
                          source={{uri: item.imageURL}} 
                        /> 
                      </View>

                      <View style = {{marginTop:10}}>

                        <View style = {{marginLeft:10}}>
                            {item.status.name == 'Open'? <Text style = {{marginLeft:5,color:"green", fontSize:18 }}> {item.status.name}</Text>: <Text style = {{marginLeft:5,color:"red", fontSize:18}}> {item.status.name}</Text>} 
                        </View>

                        <View style = {{flexDirection: 'row'}}>
                          <FormLabel labStyle = {{margin:0, fontSize:25, fontWeight: '400', marginRight:10}}>{item.title}</FormLabel>
                        </View>

                        <View style = {{flexDirection: 'column', flexWrap:'wrap'}}>
                          <Text style = {{marginLeft:20}}>Item Status: {item.itemStatus}</Text>
                          <Text style = {{marginLeft:20}}>Loan Date: {item.loanDate.substring(0, 10)}</Text>
                          <View>
                            {item.status.name == 'Open'? <Text style = {{marginLeft:20}}>Due Date: {item.dueDate.substring(0, 10)}</Text>: null}
                            {item.status.name == 'Closed'? <Text style = {{marginLeft:20}}>Return Date: {item.returnDate.substring(0, 10)}</Text>: null} 
                          </View>
                        </View>

                      </View>
                    </View>}
                  />
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
