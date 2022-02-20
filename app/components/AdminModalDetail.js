import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Detail from './Detail';
import FormFieldTitle from './FormFieldTitle';

export default function AdminModalDetail({ title, data }) {
  return (
    <View style={styles.div}>
      <FormFieldTitle style={{ flex: 1 }}>{title}</FormFieldTitle>
      <Detail style={{ flex: 1 }}>{data}</Detail>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    flexDirection: 'row',
  },
});
