import React, {useContext, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';
// import { Authcontext } from '../../Navigation/AuthProvider';
// const {height} = useWindowDimensions();
const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [passwordrepeat, setpasswordrepeat] = useState();

  // const { register } =useContext(Authcontext);
  const onRegisterpressed = async () => {
    // console.warn('Register pressed');
    // register(email, password)
    console.log(email, password, username);
    fetch('http://6073-2405-201-c02d-e2-e07b-34d2-9a08-75cf.ngrok.io/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    })
      .then(res => res.json())
      // .then(async (data) => {
      //   console.log(data);
      //   try {
      //     await AsyncStorage.setItem('token', data.token);
      //     navigation.navigate('ConfirmEmail')
      //   } catch (e) {
      //     console.log(e);
      //   }
      // });
      .then(() =>{
        navigation.navigate('ConfirmEmail')
      })
    //  navigation.navigate('ConfirmEmail')
  };

  const onSignInFacebook = () => {
    console.warn('sign in facebook');
  };
  const onSignInGoogle = () => {
    console.warn('sign in google');
  };
  const onSignPress = () => {
    // console.warn('Sign pressed');
    navigation.navigate('SignIn');
  };
  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Create an Account</Text>
        <Custominput
          placeholder="Username"
          value={username}
          setValue={text => setusername(text)}
          secureTextEntry={false}
        />
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
        {/* <Custominput
        placeholder="Re-enter Password"
        value={passwordrepeat}
        setValue={setpasswordrepeat}
        secureTextEntry={true}
      /> */}
        <Custombutton text="Register" onPress={() => onRegisterpressed()} />
        {/* <Custombutton
        text="Forgot Password?"
        onPress={onForgotpressed}
        type="TERTIARY"
      /> */}
        <Text style={styles.text}>
          By Registering, you confirm that you aceept our{' '}
          <Text style={styles.link}>Terms of Use</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
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
          text="Have an account? SignIn"
          onPress={onSignPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    margin: 10,
    textAlign: 'center',
  },
  text: {
    color: 'black',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpScreen;
