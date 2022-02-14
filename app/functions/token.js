import * as SecureStore from 'expo-secure-store';

const removeToken = async () => {
  await SecureStore.deleteItemAsync('token');
};

const retrieveToken = async () => {
  const token = await SecureStore.getItemAsync('token');
  return token;
};

export { removeToken, retrieveToken };
