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
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import DataContext from '../../contexts/DataContext';

export default function QRScanScreen() {
  const { registrations } = useContext(DataContext);
  const { width } = Dimensions.get('screen');
  const [input, setInput] = useState('');

  const [successfullyRead, setSuccessfullyRead] = useState(false);
  const [registrationData, setRegistrationData] = useState({});

  const onSubmit = (code) => {
    console.log(code);
    const [eventId, id] = code.split('/');
    if (registrations) {
      console.log(registrations, registrations[eventId]);
      if (id in registrations[eventId]) {
        console.log('aaja bhai', registrations[eventId][id]);
        setSuccessfullyRead(true);
        setRegistrationData(registrations[eventId][id]);
      } else {
        console.log('fuck off you bitch');
      }
    } else {
      console.log('not an admin sorry');
    }
    return true;
  };

  return (
    <ScrollView>
      <QRCodeScanner
        onRead={(data) => onSubmit(data.data)}
        topContent={<Text style={styles.centerText}>Scan the QR Code</Text>}
        bottomContent={
          <View style={{ width: '100%' }}>
            <TextInput
              style={{ borderBottomWidth: 2, borderBottomColor: 'red' }}
              value={input}
              onChangeText={(text) => setInput(text)}
            />
            <Button title="submit" onPress={() => onSubmit(input)} />
          </View>
        }
        cameraStyle={{
          width: 250,
          height: 250,
          marginLeft: (width - 250) / 2,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={successfullyRead}
          onRequestClose={() => {
            // onclose
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {JSON.stringify(registrationData, null, 2)}
              </Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setSuccessfullyRead(false);
                }}>
                <Text style={styles.textStyle}>Confirm</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 22,
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
