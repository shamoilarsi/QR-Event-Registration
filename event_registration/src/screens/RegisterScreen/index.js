import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-community/picker';

import { Formik } from 'formik';
import * as yup from 'yup';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import DataContext from '../../contexts/DataContext';

const submitSchema = yup.object({
  name: yup.string().required().min(4),
  email: yup.string().required().email(),
  number: yup
    .string()
    .required()
    .min(10, 'enter valid number')
    .max(10, 'enter valid number'),
  college: yup.string().required(),
});

export default function RegisterScreen({ navigation, route }) {
  const { user, registerParticipant } = useContext(DataContext);

  const event = route.params.event;

  const [isPaid, setIsPaid] = useState(false);
  const [slot, setSlot] = useState(0);

  const titles = [
    { title: 'Enter Name', formId: 'name' },
    { title: 'Enter Number', formId: 'number', keyboardType: 'numeric' },
    { title: 'Enter Email', formId: 'email', keyboardType: 'email-address' },
    { title: 'Enter College', formId: 'college' },
  ];

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: 'black', ...Typography.title }}>
          Registration form for
        </Text>
        <Text style={Typography.heading}>{event.title}</Text>
      </View>
      <Formik
        initialValues={{
          name: 'shamoil',
          college: 'sae',
          number: '0987654321',
          email: 'shamoil@ad.vc',
        }}
        validationSchema={submitSchema}
        onSubmit={async (values, action) => {
          if (isPaid) {
            const data = {
              ...values,
              volunteer: '', // user.displayName,
              slot: new Date(event.slots[slot].toDate()).toLocaleString(),
            };
            const response = await registerParticipant(data, event.id);
            if (response)
              navigation.navigate('QRDisplayScreen', {
                id: response,
                details: values,
                event,
              });
            else console.log('false hua');
          } else {
            alert('Payment is not completed!');
          }
        }}>
        {(props) => (
          <View>
            {titles.map((val, index) => (
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Text style={styles.labels}>{val.title}</Text>
                  <Text style={styles.errorText}>
                    {props.touched[val.formId] && props.errors[val.formId]}
                  </Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={props.values[val.formId]}
                  keyboardType={val.keyboardType}
                  onBlur={props.handleBlur(val.formId)}
                  onChangeText={props.handleChange(val.formId)}
                />
              </View>
            ))}

            <View
              style={{
                marginTop: 20,
              }}>
              <Text style={styles.labels}>Select Slot</Text>
              <Picker
                selectedValue={new Date(
                  event.slots[slot].toDate(),
                ).toLocaleString()}
                style={{ width: '100%' }}
                onValueChange={(itemValue, itemIndex) => setSlot(itemIndex)}>
                {event.slots.map((val, index) => (
                  <Picker.Item
                    key={index}
                    label={new Date(val.toDate()).toLocaleString()}
                    value={new Date(val.toDate()).toLocaleString()}
                  />
                ))}
              </Picker>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <CheckBox
                disabled={false}
                value={isPaid}
                onValueChange={(val) => setIsPaid(val)}
              />
              <Text style={[styles.labels, { marginTop: 0 }]}>
                Paid ₹{event.price}?
              </Text>
            </View>

            <Button
              color="maroon"
              title="Submit"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.primary.main + '40',
    borderRadius: 20,
    paddingLeft: 20,
  },
  labels: { ...Typography.label },
  errorText: {
    ...Typography.label,
    color: 'red',
    paddingLeft: 20,
  },
});
