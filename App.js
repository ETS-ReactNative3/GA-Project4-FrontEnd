import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import io from 'socket.io-client';

import AdminScreen from './app/screens/AdminScreen';
import LandingScreen from './app/screens/LandingScreen';
import LoginScreen from './app/screens/LoginScreen';
import DataProvider from './app/context/Context';
import UserScreen from './app/screens/UserScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen
        name='LandingScreen'
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='UserScreen'
        component={UserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ headerTransparent: true, headerTitle: '' }}
      />
      <Stack.Screen
        name='AdminScreen'
        component={AdminScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const socket = io('http://localhost:3000', {
    auth: {
      token: 'abc',
    },
  });

  socket.on('connect', () => {
    console.log('connected to io server');
  });

  socket.on('hello', (msg) => {
    console.log(msg);
  });

  return (
    <DataProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </DataProvider>
  );
}
