import React from 'react';
import CheckBox from 'react-native-check-box';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-easy-toast'
import resources from './data/resources.json';
import languages from './data/languages.json';
//const writeJsonFile = require('write-json-file');
//import {writeFile} from './lib/RWFileUtil';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props) {
  	super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      resourceArray: resources,
      languageArray: languages,
    })
  }

  renderView() {
    //const writeJsonFile = require('write-json-file');
    if (!this.state.resourceArray || this.state.resourceArray.length === 0)return;
    var len = this.state.resourceArray.length;
    var views = [];
    let k = 0;
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    views.push(
    	<View style={styles.TitleContainer} key={k++}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', maxWidth: 50 }}>
          <TouchableHighlight style={{maxWidth: 50}} onPress={() => this.props.navigation.navigate('Root', { isLoggedIn: false, resources: this.state.resourceArray, })} style={{maxHeight: 50, maxWidth: 50}} >
            <Image style={{maxHeight: 30, maxWidth: 30}} 
              source={require('./image/logout.png')} 
            />
          </TouchableHighlight>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    	    <Text style={styles.Title}>Settings</Text>
        </View>
    	</View>
    );
    views.push(
    	<View key={k++} style={styles.SubTitleBackground}>
        <Text style={styles.SubTitleText}>Resource Type</Text>
      </View>
    );
    for (var i = 0, l = len - 2; i < l; i += 2) {
      views.push(
        <View key={k++}>
          <View style={styles.item}>
            {this.renderCheckBox(this.state.resourceArray[i])}
            {this.renderCheckBox(this.state.resourceArray[i + 1])}
          </View>
          <View style={styles.line}/>
        </View>
      )
    }
    views.push(
      <View key={k++}>
        <View style={styles.item}>
          {len % 2 === 0 ? this.renderCheckBox(this.state.resourceArray[len - 2]) : null}
          {this.renderCheckBox(this.state.resourceArray[len - 1])}
        </View>
      </View>
    ) 
    views.push(
      <View key={k++} style={styles.SubTitleBackground}>
        <Text style={styles.SubTitleText}>Language</Text>
      </View>
    )

    len = this.state.languageArray.length;
    for (var i = 0, l = len - 2; i < l; i += 2) {
      views.push(
        <View key={k++}>
          <View style={styles.item}>
            {this.renderCheckBox(this.state.languageArray[i])}
            {this.renderCheckBox(this.state.languageArray[i + 1])}
          </View>
          <View style={styles.line}/>
        </View>
      )
    }
    views.push(
      <View key={k++}>
        <View style={styles.item}>
          {len % 2 === 0 ? this.renderCheckBox(this.state.languageArray[len - 2]) : null}
          {this.renderCheckBox(this.state.languageArray[len - 1])}
        </View>
      </View>
    )
    views.push(
      <View key={k++}>
        <TouchableOpacity style={{marginTop: 10, height: 50, backgroundColor: '#3281DD',borderRadius: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} onPress={() => {
            navigate('MainTab', { 
              isLoggedIn: true,
              token: params.token, 
              username: params.username, 
              resources: this.state.resourceArray,
              languages: this.state.languageArray, 
            })
        }}
        >
          <Text style={{textAlign: 'center', color: '#ffffff', fontWeight: 'bold', width: 50,}}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    )
    return views;

  }

    renderCheckBox(data) {
      var leftText = data.name;
      return (
        <CheckBox
          style={{flex: 1, padding: 10}}
          isChecked={data.checked}
          onClick={() => {
            data.checked = !data.checked;
          }}
          leftText={leftText}
        />
      );
    }

    render() {
      console.log(this.state);
      return (
        <View style={styles.container}>
          <ScrollView>
            {this.renderView()}
          <Toast ref={e=>{this.toast=e}}/>
          </ScrollView>
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
    justifyContent: 'flex-start' 

  },
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 50,
    alignItems: 'center',
    marginLeft: -50
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
  item: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray',
  },
})

