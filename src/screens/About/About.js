import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native'
import Custombutton from '../../components/Custombutton.js'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useState } from 'react'
const About = (props) => {
    const navigation=useNavigation();
    // const onsignoutpressed=()=>{
    //   navigation.navigate('SignIn')
    // }
    const [email,setEmail] = useState()
    // const [token,setToken] = useState()
    const Boiler = async ()=>{
        const Token = await AsyncStorage.getItem("token");
      fetch('http://8f60-2405-201-c02d-e2-b1d6-fc07-c917-bc7d.ngrok.io/about',{
        // 'Accept': 'application/json',
      headers:new Headers({
        Authorization:"Bearer "+Token
      })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data.email);
        setEmail(data.email)
      }
      )
     }
  useEffect(()=>{
     Boiler()
  },[])
    const logout =(props)=>{
        AsyncStorage.removeItem("token").then(()=>{
          props.navigation.replace("SignIn")
        })
     }
    return (
        <View>
            <Text style={{fontSize:18,color:'black'}}>your email is {email}</Text>
            <Custombutton text="Sign out" onPress={() => logout(props)} />
        </View>
    )
}

export default About

