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
import { useSelectedUserContext } from '../context/Context';
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

function AdminScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);
  const [usersInfo, setUsersInfo] = useState(null);
  const [modalArrow, setModalArrow] = useState('chevron-up');
  const [modalHeight, setModalHeight] = useState('20%');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useSelectedUserContext();

  const socket = io('http://localhost:3000', {
    auth: {
      token: 'abc',
    },
  });
  socket.on('connect', () => {
    console.log('admin connected to io server');
  });
  socket.on('newUser', () => {
    console.log('new user alert!');
  });

  const checkToken = async () => {
    const token = await retrieveToken();
    if (!token) {
      console.log('cannot retrieve token');
      return navigation.navigate('LoginScreen');
    }
    const username = await retrieveUsername();
    setUsername(username);
  };

  const getUsersInfo = async () => {
    const data = await getUsersInfoAPI();
    if (!data) return;
    setUsersInfo(data);
  };

  const logout = async () => {
    await removeToken();
    await removeUsername();
    setUsername(null);
    setUsersInfo(null);
    setSelectedUser(null);
    navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    checkToken();
    getUsersInfo();
  }, []);
  return (
    <>
      <Map>
        {usersInfo
          ? usersInfo.map((user, index) => {
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
