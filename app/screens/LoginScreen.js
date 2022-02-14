import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as SecureStore from 'expo-secure-store';

import colors from '../config/colors';
import AppTextInput from '../components/TextInput';
import AppButton from '../components/Button';
import BigLogo from '../components/BigLogo';
import ErrorMessage from '../components/ErrorMessage';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  password: Yup.string().required().min(5).label('Password'),
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const [credentialErr, setCredentialErr] = useState(false);

  const getToken = async (credentials) => {
    try {
      const res = await fetch('http://localhost:4000/api/auth', {
        method: 'POST',
        headers: {
          // authorization: 'hihi',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const { token } = await res.json();
      if (res.status !== 200) {
        setCredentialErr(true);
        return console.log('error logging in');
      }
      await SecureStore.setItemAsync('token', token);
      navigation.navigate('AdminScreen');
      // const result = await SecureStore.getItemAsync('token');
      // if (result) {
      //   alert("🔐 Here's your value 🔐 \n" + result);
      // } else {
      //   alert('No values stored under that key.');
      // }
      // return console.log(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <BigLogo />
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values) => getToken(values)}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <AppTextInput
                autoCorrect={false}
                autoCapitalize='none'
                clearButtonMode='always'
                icon='user'
                onBlur={() => {
                  setFieldTouched('username');
                }}
                onChangeText={handleChange('username')}
                placeholder='Username'
                textContentType='username'
              />
              <ErrorMessage
                error={errors.username}
                visible={touched.username}
              />
              <AppTextInput
                autoCorrect={false}
                autoCapitalize='none'
                clearButtonMode='always'
                icon='lock'
                onBlur={() => {
                  setFieldTouched('password');
                }}
                onChangeText={handleChange('password')}
                placeholder='Password'
                secureTextEntry
                textContentType='password'
              />
              <ErrorMessage
                error={errors.password}
                visible={touched.password}
              />
              <AppButton title='Login' onPress={handleSubmit} />
              <ErrorMessage
                error='Invalid credentials, please try again.'
                visible={credentialErr}
                style={{ textAlign: 'center' }}
              />
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
  },
  container: {
    padding: 20,
  },
});
