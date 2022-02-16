import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Marker } from 'react-native-maps';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';

import Map from '../components/Map';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserMarker from '../components/UserMarker';
import { useSelectedUserContext } from '../context/Context';
import colors from '../config/colors';
import {
  getUsersInfoAPI,
  removeToken,
  removeUsername,
  retrieveToken,
  retrieveUsername,
} from '../functions/token';
import LogoutButton from '../components/LogoutButton';
import DetailsModal from '../components/DetailsModal';

function AdminScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);
  const [usersInfo, setUsersInfo] = useState(null);
  const [modalArrow, setModalArrow] = useState('chevron-up');
  const [modalHeight, setModalHeight] = useState('20%');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useSelectedUserContext();

  const getUsersInfo = async () => {
    const data = await getUsersInfoAPI();
    if (!data) return;
    setUsersInfo(data);
  };

  const checkToken = async () => {
    const token = await retrieveToken();
    if (!token) {
      return navigation.navigate('LoginScreen');
    }
    const username = await retrieveUsername();
    setUsername(username);
    getUsersInfo();
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
  }, []);

  return (
    <>
      <Map>
        {usersInfo
          ? usersInfo.map((user, index) => {
              return (
                <UserMarker
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
      <DetailsModal
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
