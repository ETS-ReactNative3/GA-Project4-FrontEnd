import React from 'react';
import { StyleSheet, Text } from 'react-native';

import colors from '../config/colors';

export default function Detail({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.medium_dark,
    fontSize: 20,
  },
});
