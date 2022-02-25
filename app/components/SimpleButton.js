import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

export default function SimpleButton({ onPress, position, title }) {
  return (
    <View style={styles[position]}>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <Text style={{ fontSize: 20 }}>{title}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  left: { position: 'absolute', left: 18, top: 45 },
  right: { position: 'absolute', right: 18, top: 45 },
});
