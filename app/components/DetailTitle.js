import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../config/colors';

export default function DetailTitle({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.medium_dark,
    fontSize: 20,
    paddingRight: 15,
    // textAlign: 'left',
    // width: 130,
  },
});
