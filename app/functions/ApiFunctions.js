import * as SecureStore from 'expo-secure-store';
import { retrieveToken } from './secureStoreFunctions';

const cancelRequestAPI = async (id) => {
  try {
    const res = await fetch(`http://localhost:4000/api/user/cancel/${id}`, {
      method: 'PATCH',
    });
    if (res.status !== 200) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('error', error);
  }
};

const closeCaseAPI = async (id) => {
  const token = await retrieveToken();
  try {
    const res = await fetch(`http://localhost:4000/api/user/closecase/${id}`, {
      method: 'PATCH',
      headers: {
        authorization: token,
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
    // console.log(token);
    await SecureStore.setItemAsync('token', token);
    await SecureStore.setItemAsync('username', username);

    return true;
  } catch (error) {
    console.error(error);
  }
};

const getUserInfoAPI = async (id) => {
  const token = await retrieveToken();
  try {
    const res = await fetch(`http://localhost:4000/api/user/${id}`, {
      method: 'GET',
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

const postUserAPI = async (userInfo) => {
  try {
    const res = await fetch('http://localhost:4000/api/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (res.status !== 201) {
      return false;
    }
    const data = await res.json();
    // console.log(data);
    return data.id;
  } catch (error) {
    console.error(error);
  }
};

const updateUserLocationAPI = async (id, latitude, longitude) => {
  try {
    const res = await fetch(`http://localhost:4000/api/user/location/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude, longitude }),
    });

    if (res.status !== 200) {
      return false;
    }

    const data = await res.json();
    return true;
  } catch (error) {
    console.error(error);
  }
};

const updateUserInfoAPI = async (userInfo) => {
  const token = await retrieveToken();
  try {
    const res = await fetch('http://localhost:4000/api/user/edit', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    if (res.status !== 200) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('error', error);
  }
};

export {
  cancelRequestAPI,
  closeCaseAPI,
  getTokenAPI,
  getUserInfoAPI,
  getUsersInfoAPI,
  postUserAPI,
  updateUserLocationAPI,
  updateUserInfoAPI,
};
