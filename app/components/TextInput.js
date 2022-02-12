import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import colors from '../config/colors';

export default function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && <Feather name={icon} size={20} style={styles.icon} />}
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    marginVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    color: colors.medium,
    fontSize: 18,
    fontFamily: 'Avenir',
    flex: 1,
  },
});
