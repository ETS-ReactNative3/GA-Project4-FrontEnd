import React from 'react';
import { Marker } from 'react-native-maps';
import { Image, StyleSheet, Text } from 'react-native';

export default function SelfMarker({ position }) {
  return (
    <Marker
      style={{ alignItems: 'center' }}
      coordinate={position}
      pinColor='grey'
      onPress={() => {
        console.log('help!');
      }}
    >
      <Text style={styles.text}>You're here</Text>
      <Image source={require('../assets/admin-pin.png')} />
    </Marker>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
});
