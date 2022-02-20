import React from 'react';
import { View } from 'react-native';
import { useFormikContext } from 'formik';

import UserTextInput from './UserTextInput';
import ErrorMessage from './ErrorMessage';

function FormField({ editable, name, ...otherProps }) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();
  return (
    <View style={{ flex: 1 }}>
      <UserTextInput
        clearButtonMode={editable ? 'always' : 'never'}
        edit={editable}
        editable={editable}
        onBlur={() => {
          setFieldTouched(name);
        }}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

export default FormField;
