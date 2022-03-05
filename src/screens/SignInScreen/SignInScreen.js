import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../../assets/Images/logo.png';
import Custominput from '../../components/Custominput';
import Custombutton from '../../components/Custombutton.js/Custombutton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {GoogleSignin,GoogleSigninButton} from 'google-sign-in'


const SignInScreen = () => {
  const navigation = useNavigation();
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const onSignInpressed = async () => {
    console.log(email,password);
    fetch('http://7e33-2405-201-c02d-e2-a0cf-ce72-c59b-3464.ngrok.io/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then(res => res.json())
      .then(async (data) => {
        console.log(data);
        try {
          await AsyncStorage.setItem('token', data.token);
          navigation.replace('Tabnavigate') 
        } catch (e) {
          console.log(e);
        }
      });
  }
  const onForgotpressed = () => {
    // console.warn('forgot pressed');
    navigation.navigate('ForgotPassword')
  };
  const onSignInFacebook = () => {
    console.warn('sign in facebook');
  };
  const onSignInGoogle = () => {
    console.warn('sign in google');
  };
  const onCreateAccount = () => {
    // console.warn('create account');
    navigation.navigate('SignUp')
  };
  return (
    <ScrollView>
      <View style={styles.home}>
        <Image source={Logo} style={styles.Logo} resizeMode="contain"></Image>
      <Custominput
          placeholder="Email"
          value={email}
          setValue={text => setemail(text)}
          secureTextEntry={false}
        />

        <Custominput
          placeholder="Password"
          value={password}
          setValue={text => setpassword(text)}
          secureTextEntry={true}
        />
        <Custombutton text="Sign In" onPress={() => onSignInpressed()} />
        <Custombutton
          text="Forgot Password?"
          onPress={onForgotpressed}
          type="TERTIARY"
        />
        <Custombutton
          text="Sign In With facebook"
          onPress={onSignInFacebook}
          bgColor="#E7EAF4"
          fgColor="#4765A9"
        />
        <Custombutton
          text="Sign In with Google"
          onPress={onSignInGoogle}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />
        <Custombutton
          text="Don't have an account? Create one"
          onPress={onCreateAccount}
          type="TERTIARY"
        />
        </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  Logo: {
    // width: '100%',
    // height: 100,
    // maxWidth:'100%',
    // MaxHeight:100,
    width: 250,
    height: 250,
    resizeMode: 'cover',
    marginTop: '2%',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
  },
});

export default SignInScreen;
