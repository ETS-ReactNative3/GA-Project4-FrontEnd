import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

import colors from '../config/colors';
import AppButton from './Button';
import ErrorMessage from './ErrorMessage';
import { useUserLocationContext } from '../context/Context';
import {
  cancelRequestAPI,
  getUserInfoAPI,
  postUserAPI,
  updateUserInfoAPI,
} from '../functions/apiFunctions';
import {
  removeUserID,
  retrieveUserID,
  setUserID,
} from '../functions/secureStoreFunctions';
import FormField from './FormField';
import FormFieldTitle from './FormFieldTitle';
import UserFormIntro from './UserFormIntro';
import UserFormSubmitted from './UserFormSubmitted';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  id: Yup.string().required().label('ID'),
  gender: Yup.string().required().max(1).label('Gender'),
  age: Yup.number().required().max(120).label('Age'),
  safety: Yup.number().required().min(0).max(10).label('This'),
  emotion: Yup.string().required().label('This'),
  situation: Yup.string().required().label('This'),
  perpetrator: Yup.string().required().label('This'),
  companion: Yup.boolean().required().label('This'),
});

export default function UserForm({ userExist }) {
  const [UserLocation, setUserLocation] = useUserLocationContext();
  const { latitude, longitude } = UserLocation;
  const [editable, setEditable] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: null,
    id: null,
    gender: null,
    age: null,
    safety: null,
    emotion: null,
    situation: null,
    perpetrator: null,
    companion: false,
  });

  const submitForm = async (values) => {
    const info = { ...values, latitude, longitude };
    if (!userInfo) {
      const res = await postUserAPI(info);
      if (!res) return;
      // console.log('userID', res);
      await setUserID(res);
      setUserInfo(info);
      setInitialValues(info);
    } else {
      await updateUserInfoAPI(info);
    }
    setEditable(false);
  };

  const getUserInfo = async () => {
    if (!userExist) return console.log('user dont exist');
    const userID = await retrieveUserID();
    // console.log('usesrID', userID);
    const info = await getUserInfoAPI(userID);
    if (!info) return await removeUserID();
    // console.log('getuserinfoAPI', info);
    setUserInfo(info);
    setEditable(false);
    setInitialValues(info);
    console.log('get user info', info.name);
  };

  useEffect(() => {
    getUserInfo();
    // removeUserID();
    // setUserID('T1234580L');
  }, [userExist]);

  // console.log('initialvalues', initialValues);

  return (
    <View style={styles.form}>
      {userInfo ? <UserFormSubmitted /> : <UserFormIntro />}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log('submit button pressed');
          submitForm(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, errors, setFieldValue, touched, values }) => (
          <>
            <View style={styles.row}>
              <FormFieldTitle>Name:</FormFieldTitle>
              <FormField
                autoCorrect={false}
                autoCapitalize='words'
                editable={editable}
                name='name'
                textContentType='username'
                value={values.name}
              />
            </View>

            <View style={styles.row}>
              <FormFieldTitle>ID:</FormFieldTitle>
              <FormField
                autoCorrect={false}
                autoCapitalize='characters'
                editable={editable}
                name='id'
                value={values.id}
              />
            </View>

            <View style={styles.row}>
              <FormFieldTitle>Gender:</FormFieldTitle>
              <FormField
                autoCorrect={false}
                autoCapitalize='characters'
                edit={editable}
                name='gender'
                placeholder='F/M'
                value={values.gender}
              />
            </View>

            <View style={styles.row}>
              <FormFieldTitle>Age:</FormFieldTitle>
              <FormField
                autoCorrect={false}
                editable={editable}
                keyboardType='number-pad'
                name='age'
                value={userInfo ? `${values.age}` : ''}
              />
            </View>

            <View style={styles.column}>
              <FormFieldTitle style={{ width: '100%' }}>
                Who is {'(potentially)'} causing harm?
              </FormFieldTitle>
              <FormField
                autoCapitalize='sentences'
                editable={editable}
                name='perpetrator'
                placeholder='i.e. friend, self, spouse, stranger, parent'
                value={values.perpetrator}
              />
            </View>

            <View style={styles.column}>
              <FormFieldTitle style={{ width: '100%' }}>
                How are you feeling right now?
              </FormFieldTitle>
              <FormField
                autoCapitalize='sentences'
                editable={editable}
                name='emotion'
                placeholder='i.e. angry, depressed, scared, suicidal'
                value={values.emotion}
              />
            </View>

            <View style={styles.column}>
              <FormFieldTitle style={{ width: '100%' }}>
                How safe do you feel?
              </FormFieldTitle>
              <Text style={{ fontSize: 14, color: colors.medium }}>
                On a scale of 0-10, 0 being dangerously unsafe and 10 being most
                safe
              </Text>
              <FormField
                autoCorrect={false}
                editable={editable}
                keyboardType='number-pad'
                name='safety'
                placeholder='0-10'
                value={userInfo ? `${values.safety}` : ''}
              />
            </View>

            <View style={styles.column}>
              <FormFieldTitle style={{ width: '100%' }}>
                Are you being accompanied?
              </FormFieldTitle>
              <View style={styles.row}>
                <Switch
                  disabled={!editable}
                  onValueChange={() =>
                    setFieldValue('companion', !values.companion)
                  }
                  value={values.companion}
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
              <FormFieldTitle style={{ width: '100%' }}>
                Describe your situation.
              </FormFieldTitle>
              <FormField
                autoCapitalize='sentences'
                editable={editable}
                multiline
                name='situation'
                value={values.situation}
              />
            </View>

            {editable ? (
              <AppButton title='Submit' onPress={handleSubmit} />
            ) : null}
          </>
        )}
      </Formik>
      {editable ? null : (
        <AppButton
          title='Edit'
          onPress={() => {
            setEditable(true);
          }}
        />
      )}
      {userInfo ? (
        <AppButton
          title='Cancel Request'
          onPress={async () => {
            // await cancelRequestAPI(userInfo.id);
            // await removeUserID();
            // setUserInfo(null);
            // setEditable(true);
            // const ID = await retrieveUserID();
            // console.log(ID);
            console.log('onpress', initialValues);
          }}
        />
      ) : null}
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
});
