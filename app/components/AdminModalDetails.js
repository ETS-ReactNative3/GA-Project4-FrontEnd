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
import DetailTitle from './DetailTitle';

export default function AdminModalDetails(props) {
  const [selectedUser, setSelectedUser] = useSelectedUserContext();
  console.log(selectedUser);
  return (
    <View>
      <View style={styles.div}>
        <DetailTitle>Name:</DetailTitle>
        <Detail>{selectedUser.name}</Detail>
      </View>
      <View style={styles.div}>
        <DetailTitle>Gender:</DetailTitle>
        <Detail>{selectedUser.gender}</Detail>
      </View>
      <View style={styles.div}>
        <DetailTitle>Age:</DetailTitle>
        <Detail>{selectedUser.age}</Detail>
      </View>
      <View style={styles.div}>
        <DetailTitle>Perpetrator:</DetailTitle>
        <Detail>{selectedUser.perpetrator}</Detail>
      </View>
      <View style={styles.div}>
        <DetailTitle>Safety Level:</DetailTitle>
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
