import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import colors from '../config/colors';
import { retrieveUsername } from '../functions/secureStoreFunctions';
import UserFormDetails from './UserFormDetails';
import UserFormSubmitted from './UserFormSubmitted';

export default function UserModal({
  modalArrow,
  setModalArrow,
  modalHeight,
  setModalHeight,
  modalVisible,
  setModalVisible,
}) {
  const [username, setUsername] = useState(null);

  const handleModal = () => {
    if (!modalVisible) {
      setModalVisible(!modalVisible);
      setModalHeight('70%');
      setModalArrow('chevron-down');
    }
    if (modalVisible) {
      setModalVisible(!modalVisible);
      setModalHeight('18%');
      setModalArrow('chevron-up');
    }
  };

  const getUsername = async () => {
    const username = await retrieveUsername();
    setUsername(username);
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <View style={[styles.container, { height: modalHeight }]}>
      <ScrollView style={styles.scroll}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleModal();
          }}
        >
          <Feather name={modalArrow} size={25} style={styles.icon} />
        </TouchableWithoutFeedback>
        <UserFormDetails />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: colors.medium,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  icon: {
    textAlign: 'center',
    padding: 5,
    width: '100%',
  },
  scroll: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  start: {
    fontSize: 20,
  },
});
