import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import colors from '../config/colors';

export default function UserTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && <Feather name={icon} size={20} />}
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8,
    padding: 12,
  },

  textInput: {
    color: colors.dark,
    fontSize: 18,
    flex: 1,
    marginLeft: 8,
  },
});
