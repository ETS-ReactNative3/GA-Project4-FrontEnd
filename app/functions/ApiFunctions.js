import { retrieveToken } from './secureStoreFunctions';

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
    console.log(data);
    return true;
  } catch (error) {
    console.error(error);
  }
};

export { getTokenAPI, getUsersInfoAPI, postUserAPI };
