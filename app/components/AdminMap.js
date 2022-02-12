import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function Map() {
  const [location, setLocation] = useState({
    latitude: 1.2823388,
    latitudeDelta: 0.01,
    longitude: 103.8280616,
    longitudeDelta: 0.01,
  });

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      setLocation((prevLocation) => {
        return { ...prevLocation, latitude, longitude };
      });
    })();
  }, []);

  console.log(location);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location}>
        <Marker
          style={{ alignItems: 'center' }}
          coordinate={location}
          pinColor='grey'
          onPress={() => {
            console.log('help!');
          }}
        >
          <Text style={styles.text}>You're here</Text>
          <Image source={require('../assets/admin-pin.png')} />
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
});
