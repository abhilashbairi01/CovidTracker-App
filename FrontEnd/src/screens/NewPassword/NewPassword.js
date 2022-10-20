import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
// import Logo from '../../assets/Images/logo.png';
import Custominput from '../../components/Custominput';
import Custombutton from '../../components/Custombutton.js/Custombutton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const {height} = useWindowDimensions();
const NewPassword = () => {
  const navigation=useNavigation();
  const [password, setpassword] = useState();
  const [code, setcode] = useState();
  // const [repassword, setrepassword] = useState();
  
  const onSubmitpressed = () => {
    // console.warn('Submit pressed');
    fetch(
      'http://6073-2405-201-c02d-e2-e07b-34d2-9a08-75cf.ngrok.io/newpassword',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: code,
          password:password
        }),
      },
    )
      .then(res => res.json())
      .then(async data => {
        console.log(data);
        // try {
        //   await AsyncStorage.setItem('token', data.token);

          return navigation.replace('SignIn');
        // } catch (e) {
        //   console.log(e);
        // }
      });
    // navigation.navigate('Tabnavigate')
    
  };
 
 
  
  const onSignPress = () => {
    // console.warn('Sign pressed');
    navigation.navigate('SignIn')
  };
  return (
    // <ScrollView>
    <View>
      <Text style={styles.title}>Reset Your Password</Text>
      <Custominput
        placeholder="Enter your Confirmation Code"
        value={code}
        setValue={setcode}
        secureTextEntry={false}
      />
      <Custominput
        placeholder="Enter your New password"
        value={password}
        setValue={setpassword}
        secureTextEntry={false}
      />
      {/* <Custominput
        placeholder="Re-enter your New password"
        value={repassword}
        setvalue={setrepassword}
        secureTextEntry={false}
      /> */}
      
      <Custombutton text="Submit" onPress={onSubmitpressed} />
      {/* <Custombutton
        text="Forgot Password?"
        onPress={onForgotpressed}
        type="TERTIARY"
      /> */}

       <Custombutton
        text= "Back to Sign In"
        onPress={onSignPress}
        type="TERTIARY"
      />
    </View>
    // </ScrollView>
  );
};
const styles = StyleSheet.create({
 
  title: {
    fontSize:24,
    fontWeight: 'bold',
    color:'blue',
    margin:10,
    textAlign: 'center',
  },
  text: {
  color:'white',
  marginVertical:10
  },
  link: {
    color:'#FDB075'
  }
});

export default NewPassword;
