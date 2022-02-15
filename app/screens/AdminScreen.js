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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHeight, setModalHeight] = useState('10%');
  const [modalArrow, setModalArrow] = useState('chevron-up');
  const [selectedUser, setSelectedUser] = useSelectedUserContext();

  const handleModal = () => {
    if (!modalVisible) {
      setModalVisible(!modalVisible);
      setModalHeight('70%');
      setModalArrow('chevron-down');
    }
    if (modalVisible) {
      setModalVisible(!modalVisible);
      setModalHeight('10%');
      setModalArrow('chevron-up');
    }
  };

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
    getUsersInfo(null);
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
                  openModal={() => setModalHeight('70%')}
                />
              );
            })
          : null}
      </Map>
      <LogoutButton onPress={logout} />
      {/* <View style={{ height: modalHeight }}>
        <ScrollView
          style={{
            backgroundColor: colors.primarylite,
            borderRadius: 30,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              handleModal();
            }}
          >
            <Feather
              name={modalArrow}
              size={25}
              style={{
                textAlign: 'center',
                padding: 5,
                width: '100%',
              }}
            />
          </TouchableWithoutFeedback>
          <Text style={{ paddingHorizontal: 15, fontSize: 16 }}>
            Hi {username}, let's make someone's day better today!
          </Text>
          <Text>{selectedUser ? selectedUser.name : null}</Text>
        </ScrollView>
      </View> */}
      <DetailsModal />
    </>
  );
}

// const styles = StyleSheet.create({
//   logout: { position: 'absolute', right: 18, top: 45 },
// });

export default AdminScreen;
