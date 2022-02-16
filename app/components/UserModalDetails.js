import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import colors from '../config/colors';

import AppButton from '../components/Button';
import DetailTitle from './DetailTitle';
import UserTextInput from './UserTextInput';

const accompanied = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

const gender = [
  { label: 'Female', value: 'Female' },
  { label: 'Male', value: 'Male' },
];

const safetyLevel = [
  { label: '0 - least safe', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10 - most safe', value: 10 },
];

export default function UserModalDetails(props) {
  const [value, setValue] = useState(null);
  return (
    <View>
      <View style={styles.row}>
        <DetailTitle>Name:</DetailTitle>
        <UserTextInput />
      </View>
      <View style={styles.row}>
        <DetailTitle>Gender:</DetailTitle>
        {/* <Detail>{selectedUser.gender}</Detail> */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={gender}
          iconStyle={styles.iconStyle}
          labelField='label'
          valueField='value'
          placeholder='Select'
          value={value}
          onChange={(item) => {
            setValue(item.value);
            console.log(item.value);
          }}
        />
      </View>
      <View style={styles.row}>
        <DetailTitle>Age:</DetailTitle>
        <UserTextInput />
      </View>
      <View style={styles.column}>
        <DetailTitle style={{ width: '100%' }}>
          Who is {'(potentially)'} causing harm?
        </DetailTitle>
        <UserTextInput placeholder='i.e. friend, self, spouse, stranger, parent' />
      </View>
      <View style={styles.column}>
        <DetailTitle style={{ width: '100%' }}>
          How are you feeling right now?
        </DetailTitle>
        <UserTextInput />
      </View>
      <View style={styles.column}>
        <DetailTitle style={{ width: '100%' }}>
          How safe do you feel?
        </DetailTitle>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={safetyLevel}
          iconStyle={styles.iconStyle}
          labelField='label'
          valueField='value'
          placeholder='Rate 0-10'
          value={value}
          onChange={(item) => {
            setValue(item.value);
            console.log(item.value);
          }}
        />
      </View>
      <View style={styles.column}>
        <DetailTitle style={{ width: '100%' }}>
          Are you being accompanied?
        </DetailTitle>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={accompanied}
          iconStyle={styles.iconStyle}
          labelField='label'
          valueField='value'
          placeholder='Select'
          value={value}
          onChange={(item) => {
            setValue(item.value);
            console.log(item.value);
          }}
        />
      </View>
      <View style={styles.column}>
        <DetailTitle style={{ width: '100%' }}>
          Describe your situation.
        </DetailTitle>
        <UserTextInput multiline numberOfLines={4} />
      </View>
      <AppButton title='Submit' />
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
  placeholderStyle: {
    fontSize: 18,
    color: colors.placeholder,
  },
  selectedTextStyle: {
    color: colors.dark,
    fontSize: 18,
  },
});
