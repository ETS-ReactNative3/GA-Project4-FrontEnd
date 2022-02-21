import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppButton from '../components/Button';
import BigLogo from '../components/BigLogo';
import ErrorMessage from '../components/ErrorMessage';
import { getTokenAPI } from '../functions/apiFunctions';
import LoginTextInput from '../components/LoginTextInput';
import { removeUserID } from '../functions/secureStoreFunctions';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  password: Yup.string().required().min(5).label('Password'),
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const [credentialErr, setCredentialErr] = useState(false);
  // const [initialValues, setnitialValues] = useState(initialState)

  const login = async (credentials) => {
    await removeUserID();
    const loggedIn = await getTokenAPI(credentials);
    if (!loggedIn) return setCredentialErr(true);
    navigation.navigate('AdminScreen');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <BigLogo />
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values, { resetForm }) => {
            login(values);
            resetForm();
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <LoginTextInput
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
              <LoginTextInput
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
