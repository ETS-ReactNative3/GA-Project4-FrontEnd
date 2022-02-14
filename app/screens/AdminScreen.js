import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import Map from '../components/Map';
import { SafeAreaView } from 'react-native-safe-area-context';

function AdminScreen() {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [usersInfo, setUsersInfo] = useState(null);

  const getUsersInfo = async (token) => {
    try {
      const res = await fetch('http://localhost:4000/api/user/all', {
        method: 'GET',
        headers: {
          authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      // console.log('data', data);
      if (res.status !== 200) {
        return console.log('fetch error');
      }
      setUsersInfo(data);
    } catch (error) {
      console.error('error', error);
    }
  };

  const retrieveToken = async () => {
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      return navigation.navigate('LoginScreen');
    }
    setToken(token);
    getUsersInfo(token);
  };

  const removeToken = async () => {
    await SecureStore.deleteItemAsync('token');
    const token = await SecureStore.getItemAsync('token');
    setToken(token);
    navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    retrieveToken();
  }, []);
  // console.log('usersinfo', usersInfo);

  return (
    <>
      <Map>
        {usersInfo
          ? usersInfo.map((user, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: user.latitude,
                    latitudeDelta: 0.01,
                    longitude: user.longitude,
                    longitudeDelta: 0.01,
                  }}
                />
              );
            })
          : null}
        <SafeAreaView style={styles.logout}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('logout');
              removeToken();
            }}
          >
            <Text style={{ fontSize: 20 }}>Logout</Text>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Map>
    </>
  );
}

const styles = StyleSheet.create({
  logout: { alignItems: 'flex-end', paddingRight: 18 },
});

export default AdminScreen;
