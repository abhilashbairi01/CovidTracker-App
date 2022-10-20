/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import ConfirmEmail from './src/screens/ConfirmEmail/ConfirmEmail';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';
import NewPassword from './src/screens/NewPassword/NewPassword';
import Navigation from './src/Navigation';


const App = () => {
  

  return (
    <SafeAreaView style={styles.roots}>
      {/* <SignInScreen/> */}
      {/* <SignUpScreen/> */}
      {/* <ConfirmEmail/> */}
      {/* <ForgotPassword/> */}
      {/* <NewPassword/> */}
      <Navigation/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  roots:{
    flex: 1,
  }
});

export default App;
