import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isbn: ""
    };
  }

  static navigationOptions = {
    title: 'HomePage',
  };

  render() {
    const { params } = this.props.screenProps.prevNav.state.params;

    if (!this.state.isLoadingComplete) {
      this.findisbncode(params.token);
    }
    console.log(this.state.isbn);

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.TitleContainer}>Library</Text>
        </View>

        <View style={styles.SubTitleBackground}>
          <Text style={styles.SubTitleText}>New Books</Text>
        </View>

        <ScrollView style={styles.container} horizontal={true}>
          <TouchableHighlight onPress={() => Linking.openURL('http://openlibrary.org/isbn/0716524783')}>
            <Image 
              style={{width: 150, height: 200}}
              source={{uri: 'http://covers.openlibrary.org/b/isbn/0716524783.jpg'}} 
            /> 
          </TouchableHighlight>

          <TouchableHighlight onPress={() => Linking.openURL('http://openlibrary.org/isbn/9781561454907')}>
            <Image 
              style={{width: 150, height: 200}}
              source={{uri: 'http://covers.openlibrary.org/b/isbn/9781561454907.jpg'}} 
            /> 
          </TouchableHighlight>

         <TouchableHighlight onPress={() => Linking.openURL('http://openlibrary.org/isbn/9780756540920')}>
            <Image 
              style={{width: 150, height: 200}}
              source={{uri: 'http://covers.openlibrary.org/b/isbn/9780756540920.jpg'}} 
           /> 
          </TouchableHighlight>

          <TouchableHighlight onPress={() => Linking.openURL('http://openlibrary.org/isbn/9780761441809')}>
            <Image 
              style={{width: 150, height: 200}}
              source={{uri: 'http://covers.openlibrary.org/b/isbn/9780761441809.jpg'}} 
           /> 
          </TouchableHighlight>

          <TouchableHighlight onPress={() => Linking.openURL('http://openlibrary.org/isbn/9780811850513')}>
            <Image 
              style={{width: 150, height: 200}}
              source={{uri: 'http://covers.openlibrary.org/b/isbn/9780811850513.jpg'}} 
           /> 
          </TouchableHighlight>
        </ScrollView>

        <View style={styles.SubTitleBackground}>
          <Text style={styles.SubTitleText}>News</Text>
        </View>

        <ScrollView contentInset={{bottom:50}} style={styles.newsbody}>
          <View>
            <Text style={styles.header}>Title of blog 1</Text>
            <Text style={styles.body}>Here is a piece of news. This is blog 1 for displaying font size and line height.</Text>
          </View>

          <View>
            <Text style={styles.header}>Title of blog 2</Text>
            <Text style={styles.body}>Here is another piece of news. This is blog 2 for displaying font size and line height.</Text>
          </View>

          <View>
            <Text style={styles.header}>Title of blog 3</Text>
            <Text style={styles.body}>Here is a third piece of news. This is blog 3 for displaying font size and line height.</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  findisbncode(token){
    let url = "http://folio-testing-backend01.aws.indexdata.com:9130/instance-storage/instances/70f70bfd-0248-453d-add5-56ffb450d1d6";

    axios.get(url, {
      headers: {
        'X-Okapi-Tenant': 'diku',
        'X-Okapi-Token': token
      }
    })
    .then( (response) => {
      const book = response.data;
      this.setState(
        (prev) => ({
          isLoadingComplete: true,
          isbn: book.identifiers[0].value,
        }));
    })
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  TitleContainer: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 100,
    backgroundColor: 'rgb(200,200,200)',
  },
  SubTitleBackground: {
    backgroundColor: 'rgb(240,240,240)',
  },
  SubTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 50,
    marginLeft: 20,
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
    lineHeight: 30,
    backgroundColor: '#fff',
  },
  body: {
    marginLeft: 20,
    fontSize: 15,
    lineHeight: 25,
    backgroundColor: '#fff',
  },
  newsbody: {
    marginBottom: 50,
    backgroundColor: '#fff',
  },
});