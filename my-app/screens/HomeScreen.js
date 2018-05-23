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
  ActivityIndicator,
  FlatList,
} from 'react-native';
import axios from 'axios';
import hostUrl from './data/url.json'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      books: "",
      idTypes: "",
      resources: "",
    };
  }

  static navigationOptions = {
    title: 'HomePage',
  };

    componentDidMount = () => {
        const {
            params
        } = this.props.navigation.state;
        this.loadFilter(params.token);
    }

    loadFilter(token) {
        let url = hostUrl.url + "/instance-types?limit=30";
        axios.get(url, {
                headers: {
                    'X-Okapi-Tenant': 'diku',
                    'X-Okapi-Token': token,
                },
            })
            .then((response) => {
                this.setState({
                    resources: response.data.instanceTypes,
                })
            })
            .catch((error) => {
                console.error(error);
            })
            .then(() => {
                let resources = this.props.navigation.state.params.resources;
                for (i in resources) {
                    for (j in this.state.resources) {
                        if (resources[i].name == this.state.resources[j].name) {
                            resources[i].id = this.state.resources[j].id;
                            break;
                        }
                    }
                }
                this.setState({
                    resources: resources,
                })
            })
            .then(() => {
                this.findInstances(token);
            })
    }

    findInstances(token) {
        let url = hostUrl.url + '/instance-storage/instances?limit=10&query=';

        var len = this.state.resources.length;
        for (i = 0; i < len; i++) {
            if (this.state.resources[i].checked) {
                url = url + "instanceTypeId=" + this.state.resources[i].id + '%20or%20';
            }
        }
        len = this.props.navigation.state.params.languages.length;
        for (i = 0; i < len; i++) {
            if (this.props.navigation.state.params.languages[i].checked) {
                url = url + "languages=" + this.props.navigation.state.params.languages[i].name + '%20or%20';
            }
        }

        url = url.substring(0, url.length - 8);
        console.log(url);

        axios.get(url, {
                headers: {
                    'X-Okapi-Tenant': 'diku',
                    'X-Okapi-Token': token,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    const instances = response.data.instances;
                    this.setState({
                        books: instances,
                    });
                } else {
                    Alert.alert('Something went wrong 1');
                }
            })
            .then(() => {
                const url = hostUrl.url + '/identifier-types?limit=30';
                axios.get(url, {
                        headers: {
                            'X-Okapi-Tenant': 'diku',
                            'X-Okapi-Token': token,
                        },
                    })
                    .then((response) => {
                        var types = response.data.identifierTypes;
                        this.setState({
                            idTypes: types,
                        });
                    })
                    .then(() => {
                        this.getRenderItems(token)
                    })
            })

    }

    async getCover(key, title) {
        console.log('https://www.googleapis.com/books/v1/volumes?q=title=' +encodeURIComponent(title) +key);
        try {
            let response = await axios.get(
              'https://www.googleapis.com/books/v1/volumes?q=title=' +encodeURIComponent(title) +key + "&key=AIzaSyClcFkzl_nDwrnCcwAruIz99WInWc0oRg8"
            );
            return response.data.items[0].volumeInfo.imageLinks.smallThumbnail;
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    async getRenderItems(token) {
        let books = [];
        var isbnid;
        var oclcid;
        var lccnid;
        var coverUrl;

        for (i = 0; i < this.state.idTypes.length; i++) {
            if (this.state.idTypes[i].name == "ISBN") {
                isbnid = this.state.idTypes[i].id;
                continue;
            }
            if (this.state.idTypes[i].name == "OCLC") {
                oclcid = this.state.idTypes[i].id;
                continue;
            }
            if (this.state.idTypes[i].name == "LCCN") {
                lccnid = this.state.idTypes[i].id;
                continue;
            }
        }
        var i;
        var id;
        var k = 0;

        for (i in this.state.books) {
            let book = this.state.books[i];
            /*
            for (j = 0; j < book.identifiers.length; j++) {
                id = book.identifiers[j].identifierTypeId;
                let value = book.identifiers[j].value.split(" ");
                value = value[0];
                if (id == isbnid) {
                    coverUrl = await this.getCover('&isbn=' + value, book.title);
                    console.log(coverUrl);
                    if (coverUrl != "") {
                        console.log(book.title);
                        books.push(book);
                        books[books.length - 1].cover = coverUrl;
                        break;
                    }
                } else if (id == oclcid) {
                    coverUrl = await this.getCover('&oclc=' + value, book.title);
                    if (coverUrl != "") {
                        console.log(book.title);
                        books.push(book);
                        books[books.length - 1].cover = coverUrl;
                        break;
                    }
                } else if (id == lccnid) {
                    coverUrl = await this.getCover('&lccn=' + value, book.title);
                    if (coverUrl != "") {
                        console.log(book.title);
                        books.push(book);
                        books[books.length - 1].cover = coverUrl;
                        break;
                    }
                } 
            } */
            console.log(book.title);
            books.push(book);
            coverUrl = await this.getCover('', book.title);
            console.log(coverUrl);
            books[books.length - 1].cover = coverUrl;
            k++;
        }
        this.setState({
            books: books,
            isLoadingComplete: true,
        })
    }

    _keyExtractor = (item, index) => item.id;
  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.isLoadingComplete) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.TitleContainer}>Library</Text>
        </View>

        <View style={styles.SubTitleBackground}>
          <Text style={styles.SubTitleText}>New Books</Text>
        </View>

        <View style={styles.container}>
          <FlatList
            horizontal={true}
            data={this.state.books}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => (
              <TouchableHighlight 
                onPress={() => navigate('Book', { book: item })} >
                  <Image style={{ width: 130, height: 200 }}
                    source={{ uri: item.cover } } 
                  />
              </TouchableHighlight>
            )}
          />
        </View>

        <View style={styles.SubTitleBackground}>
          <Text style={styles.SubTitleText}>News</Text>
        </View>

        <ScrollView contentInset={{ bottom: 50 }} style={styles.newsbody}>
          <TouchableHighlight onPress={() => Linking.openURL('http://google.com')}>
            <View>
              <Text style={styles.header}>Title of blog 1</Text>
              <Text style={styles.body}>Here is a piece of news. This is blog 1 for displaying font size and line height.</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => Linking.openURL('http://google.com')}>
            <View>
              <Text style={styles.header}>Title of blog 2</Text>
              <Text style={styles.body}>Here is another piece of news. This is blog 2 for displaying font size and line height.</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => Linking.openURL('http://google.com')}>
            <View>
              <Text style={styles.header}>Title of blog 3</Text>
              <Text style={styles.body}>Here is a third piece of news. This is blog 3 for displaying font size and line height.</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
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
    marginBottom: 30,
    backgroundColor: '#fff',
  },
});
