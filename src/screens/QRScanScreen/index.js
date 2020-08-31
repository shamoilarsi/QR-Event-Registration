/* eslint-disable no-alert */
import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Button,
  Modal,
  ScrollView,
  ToastAndroid,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import DataContext from '../../contexts/DataContext';
import Typography from '../../constants/Typography';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('screen');

let eventId = null;
let id = null;

export default function QRScanScreen({ navigation }) {
  const { registrations, setAttended } = useContext(DataContext);
  const [input, setInput] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [registrationData, setRegistrationData] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = (code) => {
    setIsFetching(true);
    const parts = code.split('/');
    eventId = parts[0];
    id = parts[1];

    if (!registrations) {
      alert('Please try later...');
      return;
    }

    if (id in registrations[eventId]) {
      setShowModal(true);
      setRegistrationData(registrations[eventId][id]);
    } else {
      alert('Not registered!!');
    }
  };

  return (
    <ScrollView>
      <QRCodeScanner
        reactivate={false}
        onRead={(data) => onSubmit(data.data)}
        topContent={<Text style={styles.centerText}>Scan the QR Code</Text>}
        bottomContent={
          <View style={styles.bottomContent}>
            <TextInput
              style={styles.textInput}
              value={input}
              onChangeText={(text) => setInput(text)}
            />
            <Button
              disabled={isFetching}
              title="submit"
              onPress={() => onSubmit(input)}
            />
          </View>
        }
        cameraStyle={styles.cameraStyle}
      />
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            // onclose
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.mainText}>
                <Text style={styles.modalTitle}>{registrationData.event}</Text>
                <Text style={styles.modalKeys}>
                  Name -{' '}
                  <Text
                    style={[
                      styles.modalValues,
                      // eslint-disable-next-line react-native/no-inline-styles
                      { textTransform: 'capitalize' },
                    ]}>
                    {registrationData.name}
                  </Text>
                </Text>
                <Text style={styles.modalKeys}>
                  Slot -{' '}
                  <Text style={styles.modalValues}>
                    {registrationData.slot}
                  </Text>
                </Text>
                <Text style={styles.modalKeys}>
                  College -{' '}
                  <Text style={styles.modalValues}>
                    {registrationData.college}
                  </Text>
                </Text>

                <Text style={styles.modalKeys}>
                  Number -{' '}
                  <Text style={styles.modalValues}>
                    {registrationData.number}
                  </Text>
                </Text>
              </View>
              <View style={styles.modalButtonContainer}>
                <TouchableHighlight
                  style={{
                    ...styles.modalButton,
                    backgroundColor: Colors.primary.red,
                  }}
                  onPress={() => {
                    setShowModal(false);
                    setIsFetching(false);
                  }}>
                  <Text style={styles.textStyle}>Cancel </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.modalButton}
                  onPress={() => {
                    setAttended(eventId, id);
                    setShowModal(false);
                    setIsFetching(false);

                    ToastAndroid.show('Attendance marked', ToastAndroid.SHORT);
                    navigation.navigate('Home');
                  }}>
                  <Text style={styles.textStyle}>Confirm </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cameraStyle: {
    width: 250,
    height: 250,
    marginLeft: (width - 250) / 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    padding: 0,
    width: '60%',
  },
  bottomContent: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  modalTitle: { ...Typography.title, fontSize: 21, marginBottom: 10 },
  modalValues: { fontWeight: '700', fontSize: 17 },
  modalKeys: { ...Typography.label, fontSize: 17 },
  modalButtonContainer: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333af',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainText: { marginBottom: 30 },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  modalText: {
    marginBottom: 15,
  },
});
