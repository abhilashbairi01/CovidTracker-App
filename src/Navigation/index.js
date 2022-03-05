import React, {useContext} from 'react';
import {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ConfirmEmail from '../screens/ConfirmEmail/ConfirmEmail';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import NewPassword from '../screens/NewPassword/NewPassword';
import Homescreen from '../screens/Homescreen/index';
import Tabnavigate from '../screens/TabNavigation/Tabnavigate';
import LoadingScreen from '../screens/Loading/LoadingScreen';

import Newscontent from '../screens/Newsbody/Newscontent';

import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useNavigation } from '@react-navigation/native';
// import Drawer from '../screens/DrawerNavigate/Drawers'

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [isloggedin, setLoggedIn] = useState(false);
  const DetectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };
  useEffect(() => {
    DetectLogin();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="loading" component={LoadingScreen} />

        <Stack.Screen name="SignIn" component={SignInScreen} />

        {/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Tabnavigate" component={Tabnavigate} />
        <Stack.Screen name="Newscontent" component={Newscontent} />
       
      </Stack.Navigator>
      {/* <Tabnavigate/> */}
    </NavigationContainer>
  );
};

export default Navigation;

