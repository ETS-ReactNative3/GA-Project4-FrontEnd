import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function UserFormSubmitted() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/huggingicon.png')}
      />
      <Text style={styles.text}>
        Submitted.{'\n'}Hang in tight, help is on its way.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 18,
  },
  logo: {
    height: 120,
    width: 120,
    margin: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
});
