import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import io from 'socket.io-client';

import Map from '../components/Map';
import {
  useOpenCasesContext,
  useSelectedUserContext,
} from '../context/Context';
import colors from '../config/colors';
import { getUsersInfoAPI } from '../functions/apiFunctions';
import {
  removeToken,
  removeUsername,
  retrieveToken,
  retrieveUsername,
} from '../functions/secureStoreFunctions';
import LogoutButton from '../components/LogoutButton';
import AdminModal from '../components/AdminModal';
import ShowUserMarker from '../components/ShowUserMarker';

const socket = io('http://localhost:3000', {
  auth: {
    token: 'abc',
  },
});
socket.on('connect', () => {
  console.log('admin connected to io server');
});

function AdminScreen() {
  const navigation = useNavigation();
  const [modalArrow, setModalArrow] = useState('chevron-up');
  const [modalHeight, setModalHeight] = useState('20%');
  const [modalVisible, setModalVisible] = useState(false);
  const [openCases, setOpenCases] = useOpenCasesContext();
  const [selectedUser, setSelectedUser] = useSelectedUserContext();

  socket.on('newUser', async () => {
    await getUsersInfo();
    console.log('receive new user V99999');
  });

  const checkToken = async () => {
    const token = await retrieveToken();
    if (!token) {
      console.log('cannot retrieve token');
      return navigation.navigate('LoginScreen');
    }
  };

  const getUsersInfo = async () => {
    const data = await getUsersInfoAPI();
    if (!data) return;
    setOpenCases(data);
  };

  const logout = async () => {
    await removeToken();
    await removeUsername();
    setOpenCases(null);
    setSelectedUser(null);
    navigation.navigate('LoginScreen');
  };
  // console.log(usersInfo);

  useEffect(() => {
    checkToken();
    getUsersInfo();
  }, []);
  return (
    <>
      <Map>
        {openCases
          ? openCases.map((user, index) => {
              return (
                <ShowUserMarker
                  key={index}
                  user={user}
                  index={index}
                  openModal={() => {
                    setModalHeight('70%');
                    setModalVisible(!modalVisible);
                    setModalArrow('chevron-down');
                  }}
                />
              );
            })
          : null}
      </Map>
      <LogoutButton onPress={logout} />
      <AdminModal
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

export default AdminScreen;
