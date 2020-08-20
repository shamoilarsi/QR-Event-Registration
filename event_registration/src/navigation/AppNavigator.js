import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/HomeScreen/index';
import Event from '../screens/EventScreen/index';
import Register from '../screens/RegisterScreen/index';
import QRDisplayScreen from '../screens/QRDisplayScreen/index';
import QRScanScreen from '../screens/QRScanScreen/index';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="QRDisplayScreen" component={QRDisplayScreen} />
        <Stack.Screen name="QRScanScreen" component={QRScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
