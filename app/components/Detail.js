import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../config/colors';

export default function Detail({ children, style }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{children}</Text>
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
  text: {
    color: colors.medium_dark,
    fontSize: 20,
  },
});
