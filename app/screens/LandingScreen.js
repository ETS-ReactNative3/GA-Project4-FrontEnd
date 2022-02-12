import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import SOSButton from '../components/SOSButton';
import ScreenWithLogo from '../components/ScreenWithLogo';
import colors from '../config/colors';

export default function LandingScreen() {
  return (
    <ScreenWithLogo>
      <View style={styles.container}>
        <SOSButton />
      </View>
    </ScreenWithLogo>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
