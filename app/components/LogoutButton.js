import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

export default function LogoutButton({ onPress }) {
  return (
    <View style={styles.logout}>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <Text style={{ fontSize: 20 }}>Logout</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  logout: { position: 'absolute', right: 18, top: 45 },
});
