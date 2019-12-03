import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Currency from "react-number-format";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Moment from 'moment-timezone';

export default class Transaction extends Component {
  state = {
    data: []
  };

  newObject = [];

  filter(query) {
    const newData = this.newObject.filter(item => {
      const itemData = `${item.beneficiary_name.toLowerCase()}`;
      return itemData.indexOf(query) > -1;
    });

    console.log(newData);

    this.setState({data: newData});
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("https://nextar.flip.id/frontend-test");
    const json = await response.json();
    const newObject = [];
    Object.keys(json).map((key, index) => {
        this.newObject.push(json[key]);
    })
    this.setState({ data: this.newObject });
  };

  toUpper() {
    
  }

  render() {
    var idLocale = require('moment/locale/id');
    Moment.updateLocale('id', idLocale);
    return (
    <FlatList
        data={this.state.data}
        keyExtractor={(item, i) => item.id}
        renderItem={({ item }) =>
            <View style={ 
            item.status == 'SUCCESS' 
            ? 
            styles.containerSuccess
            : item.status == 'PENDING'
            ?
            styles.containerPending
            :
            styles.containerFailed}>
                <View style={styles.Detail}>
                    <View style={{marginTop: 5, flexDirection:"row"}}>
                      <Text style={{textTransform: "uppercase", fontWeight: "bold"}}>
                        {`${item.sender_bank}`}
                      </Text>
                      <AntDesign name='arrowright' color="#000" size={20} />
                      <Text style={{textTransform: "uppercase", fontWeight: "bold"}}>
                        {`${item.beneficiary_bank}`}
                      </Text>
                    </View>
                    <Text style={{paddingTop: 5}}>
                      {`${item.beneficiary_name}`}
                    </Text>
                    <View style={{marginTop: 5, flexDirection:"row"}}>
                      <Text>
                        <Currency renderText={value => <Text>{value}</Text>} 
                          value={`${item.amount}`} displayType={'text'} 
                          thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp'}/>
                      </Text>
                      <Entypo name='dot-single' color="#000" size={20} />
                      <Text>
                        {Moment(`${item.completed_at}`).tz('Asia/Jakarta', true).format('d MMMM YYYY')}
                      </Text>
                    </View>
                </View>
                {
                  item.status == 'SUCCESS'
                  ?
                  <View style={styles.StatusSuccess}>
                    <Text style={styles.Status}>
                      Berhasil
                    </Text>
                  </View>
                  : item.status == 'PENDING'
                  ?
                  <View style={styles.StatusPending}>
                    <Text style={styles.Status}>
                      Pending
                    </Text>
                  </View>
                  :
                  <View style={styles.StatusFailed}>
                    <Text style={styles.Status}>
                      Gagal
                    </Text>
                  </View>
                }
                
            </View>
        }
    />
    );
  }
}

const styles = StyleSheet.create({
  containerSuccess: {
    flexDirection: "row",
    borderRadius: 10,
    borderLeftWidth: 10,
    marginTop: 15,
    backgroundColor: 'white', 
    height: 100, 
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderLeftColor: '#7AC9A2'
  },
  containerPending: {
    flexDirection: "row",
    borderRadius: 10,
    borderLeftWidth: 10,
    marginTop: 15,
    backgroundColor: 'white', 
    height: 100, 
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderLeftColor: '#FFD700'
  },
  containerFailed: {
    flexDirection: "row",
    borderRadius: 10,
    borderLeftWidth: 10,
    marginTop: 15,
    backgroundColor: 'white', 
    height: 100, 
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderLeftColor: '#FF0000'
  },
  Detail: {
      flexDirection: "column",
      marginLeft: 10,
      height: '90%',
      width: '60%'
  },
  StatusSuccess: {
    borderRadius: 10,
    backgroundColor: '#7AC9A2',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    width: '20%',
    marginStart: 50
  },
  StatusPending: {
    borderRadius: 10,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    width: '20%',
    marginStart: 50
  },
  StatusFailed: {
    borderRadius: 10,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    width: '20%',
    marginStart: 50
  },
  Status: {
    color: 'white',
    fontWeight: 'bold'
  }
});