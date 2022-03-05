import axios from 'axios';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import covid from '../../../assets/Images/coronavirus-g5473f533a_1280.png';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dailyconfirmed: 0,
      dailydeceased: 0,
      dailyrecovered: 0,
      totalconfirmed: 0,
      totaldeceased: 0,
      totalrecovered: 0,
      firstdata: 0,
      
    };
  }
  componentDidMount() {
    axios
      .get('https://www.mohfw.gov.in/data/datanew.json')
      .then(({data}) => {
        console.log(data);
        const alldata = data;
       

        this.setState({
          dailyconfirmed: alldata[36].new_positive - alldata[36].positive,
          dailydeceased: alldata[36].new_death - alldata[36].death,
          dailyrecovered: alldata[36].new_cured - alldata[36].cured,
          totalrecovered: alldata[36].new_cured,
          totalconfirmed: alldata[36].new_positive,
          totaldeceased: alldata[36].new_death,
        
           
        
        });
      })
      .catch(error => {
        console.log(error);
      });
     
  }

  

  render() {
    
    
    return (
      <ScrollView>
      <View>
        <View style={{backgroundColor: '#d8e2fb',flexDirection: 'row', flexWrap: 'wrap'}}>
          <View>
          <Image source={covid} style={styles.small} resizeMode="contain"/>
          </View>
          <View>
          <Text style={styles.header}>COVID TRACKER</Text>
          <Text style={styles.header1}>HELPLINE NUMBER:+91-11-23978046</Text>
          <Text style={styles.header2}>
            TOLL-FREE : 1075 {'\n'}
            {'\n'}
          </Text>
          </View>
        </View>
       
      
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={styles.daily}>
            {'\n'}
            <Text>*New cases {'\n'}</Text>
            {this.state.dailyconfirmed}{' '}
          </Text>
          <Text style={styles.daily1}>
            {'\n'}
            <Text>*Deaths {'\n'}</Text>
            {this.state.dailydeceased}{' '}
          </Text>
          <Text style={styles.daily2}>
            {'\n'}
            <Text>*Recovered {'\n'}</Text>
            {this.state.dailyrecovered}{' '}
          </Text>
        </View>
      
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={styles.total}>
            {'\n'}
            <Text>
              *Total cases {'\n'}
              {'\n'}
            </Text>
            {this.state.totalconfirmed}
          </Text>
          <Text style={styles.total1}>
            {'\n'}
            <Text>*Total Deaths {'\n'}</Text>
            {this.state.totaldeceased}
          </Text>
          <Text style={styles.total2}>
            {'\n'}
            <Text>*Total Recovered {'\n'}</Text>
            {this.state.totalrecovered}
          </Text>
        </View>
      </View>
      
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  small:{
    marginVertical:15,
    height:100,
    width:100,
  },
  text: {
    //  backgroundColor:'white',
    color: 'black',
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
    color: 'black',

    fontSize: 40,

    fontFamily: 'Bangers-Regular',
  },
  header1: {
    marginVertical: 5,
    // fontFamily: 'Roboto',
    fontFamily: 'Jura-SemiBold',
    // fontWeight: '700',
    color: 'black',

    alignItems: 'center',
    textAlign: 'center',
  },
  header2: {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Jura-SemiBold',
    // fontWeight: '700',
    color: 'black',
  },
  daily: {
    marginVertical: 50,
    backgroundColor: '#daedf4',
    alignItems: 'center',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    width: 120,
    height: 120,
    
  },
  daily1: {
    marginVertical: 50,
    backgroundColor: '#ff7f7f',
    alignItems: 'center',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    width: 120,
    height: 120,
  },
  daily2: {
    marginVertical: 50,
    backgroundColor: '#ade6bb',
    alignItems: 'center',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    width: 120,
    height: 120,
  },
  total: {
    marginVertical: 20,
    backgroundColor: '#daedf4',
    alignItems: 'center',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    width: 120,
    height: 120,
  },
  total1: {
    marginVertical: 20,
    backgroundColor: '#ff7f7f',
    alignItems: 'center',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    width: 120,
    height: 120,
  },
  total2: {
    marginVertical: 20,
    backgroundColor: '#ade6bb',
    alignItems: 'center',
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    width: 120,
    height: 120,
  },
});

export default index;
