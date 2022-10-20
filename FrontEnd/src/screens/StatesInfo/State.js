import React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Custominput from '../../components/Custominput';
import Custombutton from '../../components/Custombutton.js';
// import Search from '../Searchdropdown/Search';

const url = 'https://www.mohfw.gov.in/data/datanew.json';
const State = () => {
  let statenamed = [];
  let tempList;
  const [isLoading, setLoading] = useState(true);
  const [stateName, setstateName] = useState();
  const [Data, setData] = useState([]);
  const [json, setJson] = useState();
  const [pushed, setpushed] = useState(statenamed);
  const [searching, setsearching] = useState(false);

  const Onsearch = text => {
    for (let i = 0; i < 36; i++) {
      statenamed.push(json[i].state_name);
    }

    console.log(statenamed);

    if (text) {
      setsearching(true);
      const temp = text;
      tempList = statenamed.filter(item => {
        if (item.match(temp)) return item;
      });
      setpushed(tempList),
      setstateName(tempList);
    } 
    else {
      setsearching(false);
      setpushed(statenamed);
      console.warn("preseed")
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setJson(json);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);
  function Search(props) {
    const {statenamed} = props;

    return (
      <View>
        {statenamed.map((item, index) => {
          const Inputed = () => {
            setstateName(item);
            // setpushed(item)
            // console.warn(item);
          };
          return (
            <TouchableOpacity onPress={Inputed}>
              <Text style={{color: 'black'}} key={index}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  const searchevent = async () => {
    console.log(json);
    const FilteredName = json.filter(item => item.state_name == stateName );
    console.log(pushed);
    console.log(FilteredName);
    setData(FilteredName[0] ?? {active: 'state not found'});
  };

  return (
    <View>
      <View>
        <Custominput
          placeholder="Enter the state to search"
          value={stateName}
          setValue={Onsearch}
        />
        {searching && <Search statenamed={pushed}  />}

        {/* <TextInput value={stateName} onChangeText={Onsearch}  /> */}
        <Custombutton onPress={searchevent} text="search" />
      </View>

      {/* <Text style={{color:'black'}}>{pushed.state_name}</Text> */}
      {/* <Pushdata/> */}
      <Text style={{color: 'black'}}>
        Total Active Cases: {Data.new_active}
      </Text>
      <Text style={{color: 'black'}}>
        New Cases: {Data.new_positive - Data.positive}
      </Text>
      <Text style={{color: 'black'}}>
        New cured: {Data.new_cured - Data.cured}
      </Text>
      <Text style={{color: 'black'}}>
        New Cases: {Data.new_death - Data.death}
      </Text>

      {/* {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={Data}
          keyExtractor={({sno}, index) => sno}
          renderItem={({item}) => (
            <Text style={{color: 'black'}}>{item.state_name}</Text>
          )}
        />
      )} */}
    </View>
  );
};

export default State;
