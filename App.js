import React from 'react';
import {
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import io from 'socket.io-client';

import colors from './app/config/colors';
import AdminScreen from './app/screens/AdminScreen';
import LandingScreen from './app/screens/LandingScreen';
import LoginScreen from './app/screens/LoginScreen';
import Map from './app/components/Map';
import DataProvider from './app/context/Context';

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
        name='LoginScreen'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AdminScreen'
        component={AdminScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='LandingScreen'
        component={LandingScreen}
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
});
