import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import colors from '../config/colors';

export default function BigLogo() {
  return (
    <View style={styles.logoWrapper}>
      <Image
        style={styles.bigLogo}
        source={require('../assets/huggingicon.png')}
      />
      <Text style={styles.header}>Ameliorate</Text>
      <Text style={styles.caption}>Your Neighbourhood Guardian</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bigLogo: {
    height: 120,
    width: 120,
    margin: 5,
  },
  caption: {
    fontSize: 14,
    textAlign: 'left',
    color: colors.medium_dark,
  },
  header: {
    fontSize: 36,
    color: colors.dark,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});
