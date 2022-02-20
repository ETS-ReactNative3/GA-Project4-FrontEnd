import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import colors from '../config/colors';

export default function UserTextInput({ edit, icon, ...otherProps }) {
  return (
    <View style={edit ? styles.container : styles.disabled}>
      {icon && <Feather name={icon} size={20} />}
      <TextInput
        style={edit ? styles.textInput : styles.textDisabled}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8,
    padding: 12,
  },
  disabled: {
    backgroundColor: colors.white,
    borderRadius: 20,
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
  textDisabled: {
    color: colors.dark,
    fontSize: 18,
    flex: 1,
    marginLeft: 8,
  },
});
