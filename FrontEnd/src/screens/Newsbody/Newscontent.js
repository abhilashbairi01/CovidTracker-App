import {View, Text, Image, ScrollView, StyleSheet,TouchableOpacity,Linking} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
// import Precauton from '../Precautions/Precauton'
import back from '../../../assets/Images/back.png';

const Newscontent = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  console.log(data);
  const url=data.url;
  return (
    <ScrollView>
      <View>
        <TouchableOpacity >
          <Image
            source={back}
            style={{
              width: 30,
              height: 30,
              marginVertical: 5,
              marginHorizontal: 5,
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.bodyText}>
          {data.title}
          {'\n'}
        </Text>
        <Image
          style={{
            width: '100%',
            height: 200,
            flexDirection: 'column',
            resizeMode: 'contain',
          }}
          source={{uri: `${data.urlToImage}`}}
        />
        <Text style={{color: 'black'}}>
          {'\n'}Published by : {data.source.name}
        </Text>
        <Text style={{color: 'black'}}>
          {'\n'}Published At :{data.publishedAt}
        </Text>
        <Text style={{color: 'black'}}>
          {'\n'}
          {data.description}
        </Text>
        <Text style={{color: 'black'}}>{"\n"}Read the Full News here:</Text>
        <TouchableOpacity onPress={() =>{Linking.openURL(url)}}>
        <Text style={{color:'blue'}}>
          
           {data.url}
        </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  bodyText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Newscontent;
