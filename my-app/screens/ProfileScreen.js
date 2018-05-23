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
import {
    KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';
import {
    Avatar,
    FormLabel,
    FormInput,
    FormValidationMessage,
    Badge,
    Icon,
    CheckBox
} from 'react-native-elements';
import {
    ExpoLinksView
} from '@expo/samples';
import LoginButton from './lib/LoginButton';
import DatePicker from 'react-native-datepicker'
import Collapsible from 'react-native-collapsible';
import axios from 'axios';
import hostUrl from './data/url.json'
import loanData from './data/loan.json'



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
                username: '',
                email: '',
                metadata: '',
                proxy: '',
                dateOfBirth: '',
                loans: [],
                addressLine1: '',
                addressLine2: '',
                city: '',
                addressTypeId: '',
                postalCode: '',
                primaryAddress: false,
                patronGroup: '',
                phone: '',
                titles: [],
                type: '',
                body: {},
                imageUrls: [],
            }
        }

        componentDidMount = () => {
            var fetchOptions = {
                method: 'GET',
                headers: {
                    'X-Okapi-Tenant': 'diku',
                    'Content-Type': 'application/json',
                    "X-Okapi-Token": this.props.navigation.state.params.token
                },
            }
            let url = hostUrl.url + "/users?query=username=" + this.props.navigation.state.params.username;
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
                .catch((error) => {
                    throw error;
                })
                .then(() => {
                    let urlForUserInfo = hostUrl.url + "/users/" + this.state.id;
                    axios(urlForUserInfo, fetchOptions)
                        .then((responseJson) => {
                            if (responseJson.status === 200) {
                                var responseBody = responseJson.data;

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

                                if (this.state.address.length) {
                                    var addressHome = this.state.address[0];

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
                .catch((error) => {
                    throw error;
                })
                .then(() => {
                    let url = hostUrl.url + "/loan-storage/loans?query=username=" + this.props.navigation.state.params.username;
                    axios(url, fetchOptions)
                        .then((responseJson) => {
                            var responseBody = responseJson.data;
                            this.setState({
                                loans: loanData,
                            })

                            if (responseJson.status === 200) {
                                console.log("success");
                            } else {
                                Alert.alert("Something went wrong");
                            }
                            return this.state;
                        })
                        .catch((error) => {
                            throw error;
                        })

                    .then((state) => {

                        let url_folio = hostUrl.url + "/inventory/items/";
                        var urls = [];
                        for (var i = 0; i < state.loans.length; i++) {
                            urls[i] = "" + url_folio + state.loans[i].itemId;
                        }
                        if (urls.length) {
                            return Promise.all(
                                    urls.map(url => axios(url, fetchOptions)
                                        .then((response, ) => {
                                            if (response.status === 200) {
                                                var responseBody = response.data;
                                                this.state.titles.push({
                                                    titleName: responseBody.title,
                                                    id: responseBody.id
                                                });
                                                this.forceUpdate();
                                            } else {
                                                Alert.alert("Something Went Wrong");

                                            }
                                            this.setState({
                                                isLoading: false,
                                            });
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                            throw error;
                                        })
                                    )
                                )
                                .catch((error) => {
                                    console.error(error);
                                    throw error;
                                })
                                .then(() => {
                                    var titles = state.titles;
                                    var loan = state.loans;
                                    for (var i = 0; i < titles.length; i++) {
                                        for (var j = 0; j < loan.length; j++) {
                                            if (titles[i].id == loan[j].itemId) {
                                                loan[j].title = titles[i].titleName;
                                            }
                                        }
                                    }
                                    this.setState({
                                        loans: loan
                                    });

                                })
                        }
                        return this.state;
                    })

                    .then((state) => {
                            var state1 = state;
                            let url = hostUrl.url + "/addresstypes?query=addressType=Home";
                            axios(url, fetchOptions)
                                .then((responseJson) => {
                                    var responseBody = responseJson.data;
                                    if (responseJson.status === 200) {
                                        this.setState({
                                            addressTypeId: responseBody.addressTypes[0].id
                                        })
                                    } else {
                                        Alert.alert("Something went wrong");
                                    }
                                })
                            return this.state;
                        })
                        .catch((error) => {
                            throw error;
                        })
                        .then((state) => {

                            let url_folio = "https://www.googleapis.com/books/v1/volumes?q=title=";
                            var urls = [];
                            for (var i = 0; i < state.loans.length; i++) {
                                urls[i] = "" + url_folio + state.loans[i].title + "&key=AIzaSyClcFkzl_nDwrnCcwAruIz99WInWc0oRg8";
                            }
                            console.log(urls.length);
                            if (urls.length) {
                                return Promise.all(
                                        urls.map(url => axios.get(url)
                                            .then((response) => {
                                                console.log(response.status);
                                                if (response.status === 200) {
                                                    var responseBody = response.data;
                                                    var pos = 0;
                                                    var pointer = 0;
                                                    for (var i = url.length - 1; i > 0; i--) {
                                                        if (url.charAt(i) === '=' & url.charAt(i - 1) === 'e') {
                                                            pos = i;
                                                            break;
                                                        }
                                                        if (url.charAt(i) === '&') {
                                                            pointer = i;
                                                        }
                                                    }
                                                    var title = url.substring(pos + 1, pointer);
                                                    console.log(title);
                                                    console.log(responseBody.items[0].volumeInfo.imageLinks.smallThumbnail);
                                                    imageUrls = this.state.imageUrls;
                                                    imageUrls.push({
                                                        imageURL: responseBody.items[0].volumeInfo.imageLinks.smallThumbnail,
                                                        title: title
                                                    });
                                                    this.setState({
                                                        imageUrls: imageUrls
                                                    });
                                                }
                                            })
                                        )
                                    )
                                    .catch((error) => {
                                        throw error;
                                    })
                                    .then(() => {
                                        var imageUrls = this.state.imageUrls;
                                        var loan = state.loans;
                                        for (var i = 0; i < loan.length; i++) {
                                            for (var j = 0; j < imageUrls.length; j++) {
                                                if ((loan[i].title).includes(imageUrls[j].title)) {
                                                    loan[i].imageURL = imageUrls[j].imageURL;
                                                }
                                            }
                                        }
                                        this.setState({
                                            loans: loan
                                        });

                                    })
                            }
                        })
                        .catch((error) => {
                            throw error;
                        })
                })

            .catch((error) => {
              throw error;
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
                body: updateBody
            })

            var fetchOptions = {
                //method: 'PUT',
                headers: {
                    'X-Okapi-Tenant': 'diku',
                    'Content-Type': 'application/json',
                    "X-Okapi-Token": this.props.navigation.state.params.token
                },
                //body: JSON.stringify(updateBody)
            }
            var data = JSON.stringify(updateBody);

            let url = hostUrl.url + "/users/" + this.state.id;
            axios.put(url, data, fetchOptions)
                .then((response) => {
                    if (response.status === 204) {
                        Alert.alert("Successfully Updated profile");
                    } else {
                        Alert.alert("Something went wrong");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        onPressCallbackExtendedInfoUpdate = () => {

            let updateBody = JSON.parse(JSON.stringify(this.state.body));

            if (updateBody.personal.addresses < 1)
                updateBody.personal.addresses = [{
                    addressTypeId: ""
                }];

            updateBody.personal.addresses[0].addressTypeId = this.state.addressTypeId;
            updateBody.personal.addresses[0].addressLine1 = this.state.addressLine1;
            updateBody.personal.addresses[0].addressLine2 = this.state.addressLine2;
            updateBody.personal.addresses[0].city = this.state.city;
            updateBody.personal.addresses[0].postalCode = this.state.postalCode;
            updateBody.personal.addresses[0].primaryAddress = this.state.primaryAddress;

            this.setState({
                body: updateBody
            })

            var fetchOptions = {
                method: 'PUT',
                headers: {
                    'X-Okapi-Tenant': 'diku',
                    'Content-Type': 'application/json',
                    "X-Okapi-Token": this.props.navigation.state.params.token
                },

            }
            var data = JSON.stringify(updateBody)

            let url = hostUrl.url + "/users/" + this.state.id;
            axios.put(url, data, fetchOptions)
                .then((response) => {
                    //console.log(response);
                    if (response.status === 204) {
                        Alert.alert("Successfully Updated profile");
                    } else {
                        Alert.alert("Something went wrong");
                    }
                })

        };

        onPressCallbackContactInfoUpdate = () => {

            let updateBody = this.state.body;
            updateBody.personal.email = this.state.email;
            updateBody.personal.phone = this.state.phone;

            this.setState({
                body: updateBody
            })

            var fetchOptions = {
                method: 'PUT',
                headers: {
                    'X-Okapi-Tenant': 'diku',
                    'Content-Type': 'application/json',
                    "X-Okapi-Token": this.props.navigation.state.params.token
                },
                body: JSON.stringify(updateBody)
            }

            var data = JSON.stringify(updateBody);

            let url = hostUrl.url + "/users/" + this.state.id;
            axios.put(url, data, fetchOptions)
                .then((response) => {
                    if (response.status === 204) {
                        Alert.alert("Successfully Updated profile");
                    } else {
                        Alert.alert("Something went wrong");
                    }
                })
        };

        setIsCollapsed() {
            var col = this.state.isCollapsed;
            if (col === false) {
                col = true;
                this.setState({
                    isCollapsed: col,
                });
            } else {
                col = false;
                this.setState({
                    isCollapsed: col,
                });
            }
        }

        setIsCollapsedContact() {
            var col = this.state.isCollapsedContact;
            if (col === false) {
                col = true;
                this.setState({
                    isCollapsedContact: col,
                });
            } else {
                col = false;
                this.setState({
                    isCollapsedContact: col,
                });
            }
        }

        setIsCollapsedExtended() {
            var col = this.state.isCollapsedExtended;
            if (col === false) {
                col = true;
                this.setState({
                    isCollapsedExtended: col,
                });
            } else {
                col = false;
                this.setState({
                    isCollapsedExtended: col,
                });
            }
        }

        setIsCollapsedLoan() {
            var col = this.state.isCollapsedLoan;
            if (col === false) {
                col = true;
                this.setState({
                    isCollapsedLoan: col,
                });
            } else {
                col = false;
                this.setState({
                    isCollapsedLoan: col,
                });
            }
        }

        _keyExtractor = (item, index) => item.id;

        render() {
          //console.log(this.state.personal.firstname);
          

          var img = this.state.isCollapsed ?  require('./image/arrow_right.png') : require('./image/arrow_down.png');
          var img1 = this.state.isCollapsedContact ?  require('./image/arrow_right.png') : require('./image/arrow_down.png');
          var img2 = this.state.isCollapsedExtended ?  require('./image/arrow_right.png') : require('./image/arrow_down.png');
          var img3 = this.state.isCollapsedLoan ?  require('./image/arrow_right.png') : require('./image/arrow_down.png');

          return (
          <KeyboardAwareScrollView style={{backgroundColor: '#ffffff'}}>
            <View style={styles.containerStyle}>
              <View style = {{backgroundColor: '#f4f4f4'}}>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                  <Image style={{maxHeight: 210, maxWidth: 210, marginTop: 50}} 
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

              <View style={{marginTop:13}}>
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
              <View style={{marginTop:13}}>
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
              <View style={{marginTop:13}}>
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
              <View style={{marginTop:13}}>
                <Text style = {{fontSize:18, textAlign: 'center'}}> Loans </Text>
              </View>
              </View>

              <Collapsible collapsed={this.state.isCollapsedLoan}>
              <View style={{flexDirection: 'column', margin:20, marginTop:0, marginLeft: 0, marginRight: 0}}>
                <FlatList
                data= {this.state.loans}
                keyExtractor={this._keyExtractor}
                renderItem={({item}) => <View style = {{flex: 1, flexDirection: 'row', marginLeft:10, marginRight:10, borderRadius:5, marginTop: 20,borderWidth: 0.5,borderColor: 'black'}}>
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
                    <Text style = {{margin:0, marginLeft:20, fontWeight: '400', marginRight:10}}>{item.title}</Text>
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