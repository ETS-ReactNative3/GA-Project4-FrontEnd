import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Map from '../components/Map';
import UserModal from '../components/UserModal';

export default function UserScreen() {
  const [modalArrow, setModalArrow] = useState('chevron-down');
  const [modalHeight, setModalHeight] = useState('70%');
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <>
      <Map />
      <UserModal
        modalArrow={modalArrow}
        setModalArrow={setModalArrow}
        modalHeight={modalHeight}
        setModalHeight={setModalHeight}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
