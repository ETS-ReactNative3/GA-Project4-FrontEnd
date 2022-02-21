import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import colors from '../config/colors';

import SmallLogo from './SmallLogo';

export default function ScreenWithLogo({ children, style }) {
  return (
    <SafeAreaView style={styles.screen}>
      <SmallLogo />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
  },
});
