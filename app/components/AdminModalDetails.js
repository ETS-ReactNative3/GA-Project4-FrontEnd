import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useSelectedUserContext } from '../context/Context';
import Detail from './Detail';
import FormFieldTitle from './FormFieldTitle';

export default function AdminModalDetails(props) {
  const [selectedUser, setSelectedUser] = useSelectedUserContext();
  console.log(selectedUser);
  return (
    <View>
      <View style={styles.div}>
        <FormFieldTitle>Name:</FormFieldTitle>
        <Detail>{selectedUser.name}</Detail>
      </View>
      <View style={styles.div}>
        <FormFieldTitle>Gender:</FormFieldTitle>
        <Detail>{selectedUser.gender}</Detail>
      </View>
      <View style={styles.div}>
        <FormFieldTitle>Age:</FormFieldTitle>
        <Detail>{selectedUser.age}</Detail>
      </View>
      <View style={styles.div}>
        <FormFieldTitle>Perpetrator:</FormFieldTitle>
        <Detail>{selectedUser.perpetrator}</Detail>
      </View>
      <View style={styles.div}>
        <FormFieldTitle>Safety Level:</FormFieldTitle>
        <Detail>{selectedUser.safety}</Detail>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    flexDirection: 'row',
  },
});
