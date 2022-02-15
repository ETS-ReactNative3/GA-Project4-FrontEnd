import * as SecureStore from 'expo-secure-store';

const getTokenAPI = async (credentials) => {
  try {
    const res = await fetch('http://localhost:4000/api/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (res.status !== 200) {
      return false;
    }
    const { token, username } = await res.json();
    await SecureStore.setItemAsync('token', token);
    await SecureStore.setItemAsync('username', username);

    return true;
  } catch (error) {
    console.error(error);
  }
};

const getUsersInfoAPI = async () => {
  const token = await retrieveToken();
  try {
    const res = await fetch('http://localhost:4000/api/user/all', {
      method: 'GET',
      headers: {
        authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (res.status !== 200) {
      return false;
    }
    return data;
  } catch (error) {
    console.error('error', error);
  }
};

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

export {
  getTokenAPI,
  getUsersInfoAPI,
  removeToken,
  removeUsername,
  retrieveToken,
  retrieveUsername,
};
