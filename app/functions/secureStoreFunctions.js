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

const retrieveUsername = async () => {
  const username = await SecureStore.getItemAsync('username');
  return username;
};

export { removeToken, removeUsername, retrieveToken, retrieveUsername };
