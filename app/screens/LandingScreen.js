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
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.text}>
            Feeling overwhelmed?{'\n'}Losing control?{'\n'}At your wit's end?
            {'\n\n'}Don't suffer in silence, let us help you.
          </Text>

          <SOSButton />
        </View>

        <Button
          title='admin login'
          onPress={() => navigation.navigate('LoginScreen')}
        />
      </View>
    </ScreenWithLogo>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'lightgrey',
    flex: 1,
  },
  main: {
    alignItems: 'center',
  },
  text: {
    color: colors.medium,
    fontFamily: 'Rockwell',
    fontSize: 24,
    letterSpacing: 1,
    paddingHorizontal: 30,
    paddingTop: 150,
    paddingBottom: 35,
    textAlign: 'center',
    // backgroundColor: 'lightgrey',
  },
});
