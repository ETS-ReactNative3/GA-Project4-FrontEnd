import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import {
  useOpenCasesContext,
  useSelectedUserContext,
} from '../context/Context';
import { closeCaseAPI, getUsersInfoAPI } from '../functions/apiFunctions';
import AdminModalDetail from './AdminModalDetail';
import AppButton from './Button';

export default function AdminModalDetails({ handleModal }) {
  const [openCases, setOpenCases] = useOpenCasesContext();
  const [selectedUser, setSelectedUser] = useSelectedUserContext();
  console.log(selectedUser);

  const handleCloseCase = async () => {
    await closeCaseAPI(selectedUser.id);
    setSelectedUser(null);
    handleModal();
    const data = await getUsersInfoAPI();
    if (!data) return;
    setOpenCases(data);
  };

  return (
    <View>
      <AdminModalDetail title='Name:' data={selectedUser.name} />
      <AdminModalDetail title='ID:' data={selectedUser.id} />
      <AdminModalDetail title='Gender:' data={selectedUser.gender} />
      <AdminModalDetail title='Age:' data={selectedUser.age} />
      <AdminModalDetail title='Safety Level:' data={selectedUser.safety} />
      <AdminModalDetail title='Perpetrator:' data={selectedUser.perpetrator} />
      <AdminModalDetail title='Emotions:' data={selectedUser.emotion} />
      <AdminModalDetail title='Situation:' data={selectedUser.situation} />
      <AdminModalDetail
        title='Accompanied:'
        data={selectedUser.companion ? 'Yes' : 'No'}
      />
      <AppButton
        title='close case'
        onPress={() => {
          Alert.alert('Close case?', '', [
            {
              text: 'Confirm',
              onPress: async () => {
                await handleCloseCase();
              },
            },
            { text: 'Cancel' },
          ]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    flexDirection: 'row',
  },
});
