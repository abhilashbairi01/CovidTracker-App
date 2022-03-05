import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from 'react-native';

import Custominput from '../../components/Custominput';
import Custombutton from '../../components/Custombutton.js/Custombutton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmEmail = () => {
  const navigation = useNavigation();
  const [code, setcode] = useState();

  const onConfirmpressed = () => {
    console.log(code);
    fetch(
      'http://6073-2405-201-c02d-e2-e07b-34d2-9a08-75cf.ngrok.io/activate',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: code,
        }),
      },
    )
      .then(res => res.json())
      .then(async data => {
        console.log(data);
        try {
          await AsyncStorage.setItem('token', data.token);

          return navigation.replace('Tabnavigate');
        } catch (e) {
          console.log(e);
        }
      });
  };
  const onResendPress = () => {
    console.warn('Resend pressed');
  };
  const onSignPress = () => {
    // console.warn('Sign pressed');
    navigation.navigate('SignIn');
  };
  return (
    <View>
      <Text style={styles.title}>Confirm Your Email</Text>
      <Custominput
        placeholder="Enter your Confirmation Code"
        value={code}
        setValue={setcode}
        secureTextEntry={false}
      />
      {/* <TextInput
        value={code}
        placeholder="Enter your Confirmation Code"
        onChangeText={setcode}></TextInput> */}

      <Custombutton text="Confirm" onPress={onConfirmpressed} />
      {/* <Custombutton
        text="Forgot Password?"
        onPress={onForgotpressed}
        type="TERTIARY"
      /> */}

      <Custombutton
        text="Resend Code"
        onPress={onResendPress}
        type="TERTIARY"
      />
      <Custombutton
        text="Back to Sign In"
        onPress={onSignPress}
        type="TERTIARY"
      />
    </View>
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
    color: 'white',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmail;
