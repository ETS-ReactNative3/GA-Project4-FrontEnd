import * as SecureStore from 'expo-secure-store';

const removeToken = async () => {
  await SecureStore.deleteItemAsync('token');
};

const removeUsername = async () => {
  await SecureStore.deleteItemAsync('username');
};

const retrieveToken = async () => {
  const token = await SecureStore.getItemAsync('token');
  return token;
};

const retrieveUserID = async () => {
  const userID = await SecureStore.getItemAsync('userID');
  return userID;
};

const retrieveUsername = async () => {
  const username = await SecureStore.getItemAsync('username');
  return username;
};

const setUserID = async (userID) => {
  await SecureStore.setItemAsync('userID', userID);
};

export {
  removeToken,
  removeUsername,
  retrieveToken,
  retrieveUserID,
  retrieveUsername,
  setUserID,
};
