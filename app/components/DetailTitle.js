import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../config/colors';

export default function DetailTitle({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.medium_dark,
    fontSize: 20,
    paddingVertical: 5,
    paddingRight: 15,
    width: 120,
  },
});
