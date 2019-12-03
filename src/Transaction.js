import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import NumberFormat from "react-number-format";

export default class App extends Component {
  state = {
    data: []
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("https://nextar.flip.id/frontend-test");
    const json = await response.json();
    const newObject = [];
    Object.keys(json).map((key, index) => {
        newObject.push(json[key]);
    })
    console.log(newObject);
    this.setState({ data: newObject });
  };

  render() {
    return (
    <FlatList
        data={this.state.data}
        keyExtractor={(item, i) => item.id}
        renderItem={({ item }) =>
            <View style={[styles.container, 
            item.status == 'SUCCESS' 
            ? 
            {borderLeftColor: '#7AC9A2'} 
            : 
            {borderLeftColor: '#000000'}]}>
                <View style={styles.Detail}>
                    <Text>
                        {`${item.sender_bank} -> ${item.beneficiary_bank}`}
                    </Text>
                    <Text>
                        {`${item.beneficiary_name}`}
                    </Text>
                    <Text>
                        {`Rp${item.amount}.${item.completed_at}`}  
                        <NumberFormat value={44444444} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />  
                    </Text>
                </View>
                <View></View> 
            </View>
        }
    />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderRadius: 10,
    borderLeftWidth: 10,
    marginTop: 15,
    backgroundColor: 'white', 
    height: 150, 
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
  },
  Detail: {
      flexDirection: "column",
      marginLeft: 10,
      height: '90%'
  },
});