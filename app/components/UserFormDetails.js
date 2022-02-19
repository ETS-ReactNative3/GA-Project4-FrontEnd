import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Switch } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import io from 'socket.io-client';

import colors from '../config/colors';
import AppButton from './Button';
import DetailTitle from './DetailTitle';
import ErrorMessage from './ErrorMessage';
import UserTextInput from './UserTextInput';
import { useUserLocationContext } from '../context/Context';
import { postUserAPI } from '../functions/apiFunctions';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  id: Yup.string().required().label('ID'),
  gender: Yup.string().required().max(1).label('Gender'),
  age: Yup.number().required().max(120).label('Age'),
  safety: Yup.number().required().min(0).max(10).label('This'),
  emotion: Yup.string().required().label('This'),
  situation: Yup.string().label('This'),
  perpetrator: Yup.string().required().label('This'),
  companion: Yup.boolean().required().label('This'),
});

export default function UserFormDetails() {
  const [UserLocation, setUserLocation] = useUserLocationContext();
  const { latitude, longitude } = UserLocation;

  const socket = io('http://localhost:3000', {
    auth: {
      token: 'abc',
    },
  });
  socket.on('connect', () => {
    console.log('user connected to io server');
  });

  const submitForm = async (values) => {
    const userInfo = { ...values, latitude, longitude };
    const userID = await postUserAPI(userInfo);
    console.log('submit form');
    socket.emit('submitForm');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.welcome}>
        Hi, please fill up the details below and we will be with you as soon as
        we can!
      </Text>
      <Formik
        initialValues={{
          name: '',
          id: '',
          gender: '',
          age: null,
          safety: null,
          emotion: '',
          situation: '',
          perpetrator: '',
          companion: false,
        }}
        onSubmit={(values) => {
          console.log('submit button pressed');
          submitForm(values);
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          setFieldTouched,
          setFieldValue,
          touched,
          values,
        }) => (
          <>
            <View style={styles.row}>
              <DetailTitle>Name:</DetailTitle>
              <View style={styles.container}>
                <UserTextInput
                  autoCorrect={false}
                  autoCapitalize='words'
                  clearButtonMode='always'
                  onBlur={() => {
                    setFieldTouched('name');
                  }}
                  onChangeText={handleChange('name')}
                  textContentType='username'
                />
                <ErrorMessage error={errors.name} visible={touched.name} />
              </View>
            </View>

            <View style={styles.row}>
              <DetailTitle>ID:</DetailTitle>
              <View style={styles.container}>
                <UserTextInput
                  autoCorrect={false}
                  autoCapitalize='characters'
                  clearButtonMode='always'
                  onBlur={() => {
                    setFieldTouched('id');
                  }}
                  onChangeText={handleChange('id')}
                />
                <ErrorMessage error={errors.id} visible={touched.id} />
              </View>
            </View>

            <View style={styles.row}>
              <DetailTitle>Gender:</DetailTitle>
              <View style={styles.container}>
                <UserTextInput
                  autoCorrect={false}
                  autoCapitalize='characters'
                  clearButtonMode='always'
                  onBlur={() => {
                    setFieldTouched('gender');
                  }}
                  onChangeText={handleChange('gender')}
                  placeholder='F/M'
                />
                <ErrorMessage error={errors.gender} visible={touched.gender} />
              </View>
            </View>

            <View style={styles.row}>
              <DetailTitle>Age:</DetailTitle>
              <View style={styles.container}>
                <UserTextInput
                  autoCorrect={false}
                  clearButtonMode='always'
                  keyboardType='number-pad'
                  onBlur={() => {
                    setFieldTouched('age');
                  }}
                  onChangeText={(v) => setFieldValue('age', parseInt(v))}
                />
                <ErrorMessage error={errors.age} visible={touched.age} />
              </View>
            </View>

            <View style={styles.column}>
              <DetailTitle style={{ width: '100%' }}>
                Who is {'(potentially)'} causing harm?
              </DetailTitle>
              <UserTextInput
                autoCapitalize='sentences'
                clearButtonMode='always'
                onBlur={() => {
                  setFieldTouched('perpetrator');
                }}
                onChangeText={handleChange('perpetrator')}
                placeholder='i.e. friend, self, spouse, stranger, parent'
              />
              <ErrorMessage
                error={errors.perpetrator}
                visible={touched.perpetrator}
              />
            </View>

            <View style={styles.column}>
              <DetailTitle style={{ width: '100%' }}>
                How are you feeling right now?
              </DetailTitle>
              <UserTextInput
                autoCapitalize='sentences'
                clearButtonMode='always'
                onBlur={() => {
                  setFieldTouched('emotion');
                }}
                onChangeText={handleChange('emotion')}
                placeholder='i.e. angry, depressed, scared, suicidal'
              />
              <ErrorMessage error={errors.emotion} visible={touched.emotion} />
            </View>

            <View style={styles.column}>
              <DetailTitle style={{ width: '100%' }}>
                How safe do you feel?
              </DetailTitle>
              <Text style={{ fontSize: 14, color: colors.medium }}>
                On a scale of 0-10, 0 being dangerously unsafe and 10 being most
                safe
              </Text>
              <UserTextInput
                autoCorrect={false}
                clearButtonMode='always'
                keyboardType='number-pad'
                onBlur={() => {
                  setFieldTouched('safety');
                }}
                onChangeText={(v) => setFieldValue('safety', parseInt(v))}
                placeholder='0-10'
              />
              <ErrorMessage error={errors.safety} visible={touched.safety} />
            </View>

            <View style={styles.column}>
              <DetailTitle style={{ width: '100%' }}>
                Are you being accompanied?
              </DetailTitle>
              <View style={styles.row}>
                <Switch
                  value={values.companion}
                  onValueChange={() =>
                    setFieldValue('companion', !values.companion)
                  }
                />
                <Text style={styles.text}>
                  {values.companion ? 'Yes' : 'No'}
                </Text>
              </View>
              <ErrorMessage
                error={errors.companion}
                visible={touched.companion}
              />
            </View>

            <View style={styles.column}>
              <DetailTitle style={{ width: '100%' }}>
                Describe your situation.
              </DetailTitle>
              <UserTextInput
                autoCapitalize='sentences'
                clearButtonMode='always'
                multiline
                numberOfLines={4}
                onBlur={() => {
                  setFieldTouched('situation');
                }}
                onChangeText={handleChange('situation')}
              />
            </View>

            <AppButton title='Submit' onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
  dropdown: {
    height: 45.7,
    backgroundColor: colors.light,
    borderRadius: 25,
    flex: 1,
    marginVertical: 8,
    padding: 12,
    paddingLeft: 20,
  },
  form: {
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 18,
    color: colors.placeholder,
  },
  selectedTextStyle: {
    color: colors.dark,
    fontSize: 18,
  },
  text: {
    color: colors.medium_dark,
    fontSize: 18,
    marginLeft: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 18,
  },
});
