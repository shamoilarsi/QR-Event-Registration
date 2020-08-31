/* eslint-disable no-alert */
import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titles = [
    { title: 'Enter Name', formId: 'name', placeHolder: 'Shamoil Arsiwala' },
    {
      title: 'Enter Number',
      formId: 'number',
      keyboardType: 'numeric',
      placeHolder: '1234567890',
    },
    {
      title: 'Enter Email',
      formId: 'email',
      keyboardType: 'email-address',
      placeHolder: 'shamoilarsiwala16@gmail.com',
    },
    {
      title: 'Enter College',
      formId: 'college',
      placeHolder: 'Sinhgad Academy of Engineering',
    },
  ];

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={Typography.title}>Registration for</Text>
        <Text style={Typography.heading}>{event.title}</Text>
      </View>
      <Formik
        initialValues={{
          name: '',
          college: '',
          number: '',
          email: '',
        }}
        validationSchema={submitSchema}
        onSubmit={async (values) => {
          setIsSubmitting(true);
          if (isPaid) {
            const data = {
              ...values,
              volunteer: user?.email,
              event: event.title,
              slot: new Date(event.slots[slot].toDate()).toLocaleString(),
            };
            const response = await registerParticipant(data, event.id);
            if (response) {
              await navigation.navigate('QRDisplay', {
                id: response,
                details: data,
                event,
              });
            } else {
              alert('Participant could not be registered!');
            }
          } else {
            alert('Payment is not completed!');
          }
          setIsSubmitting(false);
        }}>
        {(props) => (
          <View>
            {titles.map((val, index) => (
              <View key={index}>
                <View style={styles.mainForm}>
                  <Text
                    style={
                      props.touched[val.formId] && props.errors[val.formId]
                        ? styles.errorText
                        : styles.labels
                    }>
                    {(props.touched[val.formId] && props.errors[val.formId]) ||
                      val.title}
                  </Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={props.values[val.formId]}
                  placeholder={val.placeHolder}
                  keyboardType={val.keyboardType}
                  onBlur={props.handleBlur(val.formId)}
                  onChangeText={props.handleChange(val.formId)}
                />
              </View>
            ))}

            <View style={styles.slotSection}>
              <Text style={styles.labels}>Select Slot</Text>
              <Picker
                selectedValue={new Date(
                  event.slots[slot].toDate(),
                ).toLocaleString()}
                onValueChange={(_, itemIndex) => {
                  setSlot(itemIndex);
                }}>
                {event.slots.map((val, index) => (
                  <Picker.Item
                    key={index}
                    label={new Date(val.toDate()).toLocaleString()}
                    value={new Date(val.toDate()).toLocaleString()}
                  />
                ))}
              </Picker>
            </View>

            <TouchableWithoutFeedback onPress={() => setIsPaid((val) => !val)}>
              <View style={styles.isPaidSection}>
                <CheckBox
                  disabled={false}
                  value={isPaid}
                  onValueChange={(val) => setIsPaid(val)}
                />
                <Text style={styles.labels}>Paid {event.price}?</Text>
              </View>
            </TouchableWithoutFeedback>

            <Button
              title="Submit"
              disabled={isSubmitting}
              onPress={() => {
                if (!isSubmitting) {
                  props.handleSubmit();
                }
              }}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: { paddingHorizontal: 10 },
  input: {
    borderBottomColor: Colors.primary.main,
    borderBottomWidth: 2,
    padding: 0,
  },
  innerContainer: { alignItems: 'center', marginTop: 20 },
  labels: {
    ...Typography.label,
    textTransform: 'capitalize',
  },
  errorText: {
    ...Typography.label,
    color: 'red',
    textTransform: 'capitalize',
  },
  slotSection: {
    marginTop: 30,
  },
  isPaidSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  mainForm: {
    marginTop: 20,
  },
});
