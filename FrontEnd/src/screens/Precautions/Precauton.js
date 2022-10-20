import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Newscontent from '../Newsbody/Newscontent';

const newsUrl =
  'https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=34bcbb3cf1b7449fa28ef5ba535ea9b4';
const Precauton = () => {
  const navigation = useNavigation();
  const [Json, setJson] = useState([]);
  // const [data, setdata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(newsUrl);
        const data = await response.json();

        let x = data.articles;
        console.log(x);
        setJson(x);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);
  // const Navigate = () => {
  //   navigation.navigate('Newscontent');
    
  // };

  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
        <Text style={styles.header}>News</Text>
        </View>
        <Text style={styles.latest}>Latest News {'\n'}</Text>

        {Json.map((home, i) => (
          <>
            <TouchableOpacity onPress={()=>{navigation.navigate('Newscontent',{data:home})}}>
              <View style={styles.body}>
                <View style={styles.bodyinside}>
                  <Image
                    key={i}
                    // key={Math.random()}
                    style={{width: '35%', height: 100}}
                    source={{uri: `${home.urlToImage}`}}
                  />
                  <Text>{'\t'}</Text>
                  <Text style={styles.bodytext} key={Math.random()}>
                    {' '}
                    {home.title}
                    {'\n'}
                    {'\n'}
                    <Text key={Math.random()}>
                      {'\t'}
                      {'\t'}
                      {'\t'}
                      {'\t'}
                      {'\t'}
                      {'\t'}
                      {home.publishedAt}
                    </Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Text> {'\n'}</Text>
          </>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    color: 'white',
    fontWeight: '900',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  container: {
    backgroundColor: 'rgb(227, 138, 174)',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    height: 55,
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
  },
  latest: {
    fontSize: 18,
    color: 'black',
    fontWeight: '900',
    // fontStyle:'italic',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  body: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: 'black',
    borderWidth: 1,
  },
  bodyinside: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  bodytext: {
    color: 'black',
    width: '65%',
    height: 100,
    textAlign: 'left',
  },
});
export default Precauton;