import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function UserFormIntro(props) {
  return (
    <Text style={styles.container}>
      Hi, please fill up the details below and we will be with you as soon as we
      can.
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 18,
  },
});
