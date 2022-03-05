import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome'
// import Icon from 'react-native-ionicons'


const Tab = createBottomTabNavigator();

import Home from '../Homescreen/index'
import About from '../About/About';
import Precauton from '../Precautions/Precauton';
import State from '../StatesInfo/State';

import SignInScreen from '../SignInScreen/SignInScreen';

const Tabnavigate = () => {
    return (
        <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
      }}
     
    >
      <Tab.Screen 
        screenOptions={false}
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          
          tabBarIcon: ({ color, size }) => (
            <Icon name="home"  color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="State"
        component={State}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <Icon name="location-arrow" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Precautions"
        component={Precauton}
        options={{
          tabBarLabel: 'Precautions',
          tabBarIcon: ({ color, size }) => (
            <Icon name="exclamation-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Signout"
        component={About}
        options={{
          tabBarLabel: 'Sign out',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    )
}

export default Tabnavigate
