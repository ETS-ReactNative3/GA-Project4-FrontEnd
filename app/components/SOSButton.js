import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import colors from '../config/colors';

export default function SOSButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('AdminMap')}
      style={styles.touchable}
    >
      <View style={styles.button}>
        <Text style={styles.text}>Press here</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 150,
    height: 300,
    width: 300,
    shadowColor: colors.primary,
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  text: {
    color: colors.white,
    fontSize: 50,
  },
  touchable: {
    padding: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});
