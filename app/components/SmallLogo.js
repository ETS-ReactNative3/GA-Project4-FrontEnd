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
    fontSize: 12,
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
    fontSize: 24,
    color: colors.dark,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 1400,
    paddingBottom: 30,
    width: 1400,
    borderRadius: 1400,
    backgroundColor: colors.white,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 710,
    // backgroundColor: colors.light,
    shadowColor: 'grey',
    shadowOffset: { width: 5, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
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
