
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Transaction from './src/Transaction';

handleSearch = (text) => {
  const formatQuery = text.toLowerCase();
  console.log("text", formatQuery);
  this.child.filter(formatQuery);
}

const App: () => React$Node = () => {
  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.topBar}></View>
        <View style={styles.searchBar}>
          <Icon style={{padding: 10}} name='search' size={40} color="#a9a9a9" />
          <TextInput style={{fontSize: 25, width: '100%'}} onChangeText={this.handleSearch}/>
        </View>
        <Transaction ref={child => {this.child = child}} {...this.props}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    backgroundColor: '#ff8c00', 
    height: 20, 
    width: '100%'
  },
  searchBar: {
    backgroundColor: 'white', 
    height: 70, 
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
