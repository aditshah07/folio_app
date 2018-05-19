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
  TouchableHighlight,
  Keyboard,
  Platform, 
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HomeScreen from './HomeScreen';
import RootNavigation from '../navigation/RootNavigation';


export default class Login extends Component {
  
    constructor(props) {
        super(props);
        // Creating state to update the state when we get the values and can update the screen accordingly
        this.state = {
            isLoadingComplete: false,
            title: "",
            publisher: "",
            publishdate: "",
            publishlocation: "",
            contributor: "",
            notes: "",
            description: "",
            isbncode: "",
            language: "",
            subject: "",
            source: "",
            series: ""
        };
    }
    
    // This method calls when the component is ready so we make API calls to findbookinfo
    componentDidMount = () => {
        const {
            params
        } = this.props.navigation.state;
        console.log(params);
        this.findbookinfo(params.book);
    }
    
    // Method update the state according the book parameter passed from homescreen
    findbookinfo(book) {
        this.setState(
            (prev) => ({
                title: book.title,
                publisher: book.publication.length === 0 ? '' : book.publication[0].publisher,
                publishdate: book.publication.length === 0 ? '' : book.publication[0].dateOfPublication,
                publishlocation: book.publication.length === 0 ? '' : book.publication[0].place,
                contributor: book.contributors.length === 0 ? '' : book.contributors[0].name,
                notes: book.notes.length === 0 ? 'Currently Unavailable' : book.notes,
                description: book.physicalDescriptions.length === 0 ? 'Currently Unavailable' : book.physicalDescriptions,
                isbncode: book.identifiers[0].value,
                language: book.language,
                subject: book.subjects,
                source: book.source,
                series: book.series,
                isLoadingComplete: true,
            })
        );
    }

  render() {
    const { params } = this.props.navigation.state;

    if (!this.state.isLoadingComplete) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        
        <View style={styles.TitleContainer}>
          <View style={{flex: 1}}>
            <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={{maxHeight: 50, maxWidth: 50}} >
              <Image style={{maxHeight: 50, maxWidth: 50}} 
                source={require('./image/back.png')} 
              />
            </TouchableHighlight>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.Title}>Library</Text>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, 
                        justifyContent: 'center', 
                        alignItems: 'center'
                      }}>
            <Image 
              style={{width: 120, height: 160, 
                      marginTop: 180 
              }}
              source={{uri: params.book.cover}} 
            />
          </View>

          <View style={{flex: 1, marginTop: 10}}>
            <Text>Title: {this.state.title}</Text>
            <Text>Publisher: {this.state.publisher}</Text>
            <Text>Contributor: {this.state.contributor}</Text>
            <Text>Date: {this.state.publishdate}</Text>
            <Text>City: {this.state.publishlocation}</Text>
            <Text>Language: {this.state.language}</Text>
            <Text>ISBN: {this.state.isbncode}</Text>
            <Text>Classification: {this.state.subject}</Text>
            <Text>Series: {this.state.series}</Text>
          </View>
        </View>

        <View style={styles.NotesTitle}>
          <Text style={styles.SubTitleText}>Notes</Text>
        </View>

        <View>
          <Text style={styles.NotesText}>{this.state.notes}</Text>
        </View>

        <View style={styles.DescriptionTitle}>
          <Text style={styles.SubTitleText}>Desription</Text>
        </View>

        <View>
          <Text style={styles.DescriptionText}>{this.state.description}</Text>
        </View>
      </View>
    )
  }

  

}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  TitleContainer: {
    marginTop: 50,  
    backgroundColor: 'rgb(200,200,200)',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 50,
  },
  Back: {
    fontSize: 10,
    lineHeight: 50,
  },
  NotesTitle: {
    backgroundColor: 'rgb(240,240,240)',
    marginTop: 180,
  },
  DescriptionTitle: {
    backgroundColor: 'rgb(240,240,240)',
    marginTop: 10,
  },
  NotesText: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
  },
  DescriptionText: {
    marginTop: 10,
    marginBottom: 20, 
    marginLeft: 20,
  },
  SubTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 50,
    marginLeft: 20,
  }
});
