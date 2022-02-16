import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import colors from '../config/colors';

export default function Logo() {
  return (
    <View style={styles.logoWrapper}>
      <View style={styles.logo}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/huggingicon.png')}
        />
        <View style={styles.name}>
          <Text style={styles.header}>Ameliorate</Text>
          <Text style={styles.caption}>Your Neighbourhood Guardian</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caption: {
    fontSize: 10,
    textAlign: 'left',
    color: colors.medium_dark,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  header: {
    fontSize: 20,
    color: colors.dark,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  name: { alignItems: 'center' },
  text: {
    fontSize: 20,
  },
  tinyLogo: {
    height: 48,
    width: 48,
    margin: 0,
  },
});
