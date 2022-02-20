import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SOSButton from '../components/SOSButton';
import ScreenWithLogo from '../components/ScreenWithLogo';
import colors from '../config/colors';

export default function LandingScreen() {
  const navigation = useNavigation();

  return (
    <ScreenWithLogo>
      <View>
        <Text style={styles.text}>Feeling overwhelmed? Let us help you</Text>
      </View>

      <View style={styles.container}>
        <SOSButton />
      </View>
      <View style={styles.adminLogin}>
        <Button
          title='admin login'
          onPress={() => navigation.navigate('LoginScreen')}
        />
      </View>
    </ScreenWithLogo>
  );
}

const styles = StyleSheet.create({
  adminLogin: { alignSelf: 'center', position: 'absolute', bottom: 5 },
  container: {
    alignItems: 'center',
  },
  text: {
    color: colors.medium_dark,
    fontSize: 20,
  },
});
