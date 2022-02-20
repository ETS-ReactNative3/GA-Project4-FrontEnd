import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import SmallLogo from './SmallLogo';

export default function ScreenWithLogo({ children, style }) {
  return (
    <SafeAreaView style={styles.screen}>
      <SmallLogo />
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
  },
  container: {
    // position: 'absolute',
    // top: 140,
    flex: 1,
    width: '100%',
    // backgroundColor: 'lightgrey',
  },
});
