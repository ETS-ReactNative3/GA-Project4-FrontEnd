import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import colors from '../config/colors';
import ScreenWithLogo from '../components/ScreenWithLogo';
import AppTextInput from '../components/TextInput';
import AppButton from '../components/Button';
import BigLogo from '../components/BigLogo';
import ErrorMessage from '../components/ErrorMessage';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(5).label('Password'),
});

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <BigLogo />
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => console.log(values)}
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
              <AppTextInput
                autoCorrect={false}
                autoCapitalize='none'
                clearButtonMode='always'
                icon='user'
                keyboardType='email-address'
                onBlur={() => {
                  setFieldTouched('email');
                }}
                onChangeText={handleChange('email')}
                placeholder='Username'
                textContentType='emailAddress'
              />
              <ErrorMessage error={errors.email} visible={touched.email} />
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
