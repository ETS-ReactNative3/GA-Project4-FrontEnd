import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import colors from '../config/colors';
import { retrieveUserID, setUserID } from '../functions/secureStoreFunctions';
import UserFormSubmitted from './UserFormSubmitted';
import UserForm from './UserForm';
import { getUserInfoAPI } from '../functions/apiFunctions';

export default function UserModal({
  modalArrow,
  setModalArrow,
  modalHeight,
  setModalHeight,
  modalVisible,
  setModalVisible,
}) {
  const [userExist, setUserExist] = useState(false);

  const handleModal = () => {
    if (!modalVisible) {
      setModalVisible(!modalVisible);
      setModalHeight('70%');
      setModalArrow('chevron-down');
    }
    if (modalVisible) {
      setModalVisible(!modalVisible);
      setModalHeight('20%');
      setModalArrow('chevron-up');
    }
  };

  const checkUserStore = async () => {
    await setUserID('T1234568A');
    const userID = await retrieveUserID();
    console.log(userID);
    if (!userID) return;
    setUserExist(true);
  };
  console.log(userExist);

  useEffect(async () => {
    checkUserStore();
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
        <UserForm userExist={userExist} />
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
