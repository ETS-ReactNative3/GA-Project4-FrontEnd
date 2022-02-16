import React from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SOSButton from '../components/SOSButton';
import ScreenWithLogo from '../components/ScreenWithLogo';
import colors from '../config/colors';

export default function LandingScreen() {
  const navigation = useNavigation();

  return (
    <ScreenWithLogo>
      <View style={styles.container}>
        <SOSButton />
      </View>
      <Button
        title='admin login'
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </ScreenWithLogo>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
