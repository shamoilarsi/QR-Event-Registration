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
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import DataContext from '../../contexts/DataContext';
import Typography from '../../constants/Typography';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('screen');

let eventId = null;
let id = null;

export default function QRScanScreen() {
  const { registrations, setAttended } = useContext(DataContext);
  const [input, setInput] = useState('');

  const [successfullyRead, setSuccessfullyRead] = useState(false);
  const [registrationData, setRegistrationData] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = (code) => {
    setIsFetching(true);
    const parts = code.split('/');
    eventId = parts[0];
    id = parts[1];

    if (!registrations) {
      alert("you're not an admin. not allowed get lost");
      return;
    }
    if (id in registrations[eventId]) {
      console.log('aaja bhai', registrations[eventId][id]);
      setSuccessfullyRead(true);
      setRegistrationData(registrations[eventId][id]);
    } else {
      console.log(" you didn't register. get lost pls");
    }
  };

  return (
    <ScrollView>
      <QRCodeScanner
        reactivate
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
          visible={successfullyRead}
          onRequestClose={() => {
            // onclose
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.mainText}>
                <Text style={styles.modalTitle}>{registrationData.event}</Text>
                <Text style={Typography.label}>
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
                <Text style={Typography.label}>
                  Slot -{' '}
                  <Text style={styles.modalValues}>
                    {registrationData.slot}
                  </Text>
                </Text>
                <Text style={Typography.label}>
                  College -{' '}
                  <Text style={styles.modalValues}>
                    {registrationData.college}
                  </Text>
                </Text>

                <Text style={Typography.label}>
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
                    setSuccessfullyRead(false);
                    setIsFetching(false);
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.modalButton}
                  onPress={() => {
                    setAttended(eventId, id);
                    setSuccessfullyRead(false);
                    setIsFetching(false);
                  }}>
                  <Text style={styles.textStyle}>Confirm</Text>
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
  modalTitle: { ...Typography.title, fontSize: 18 },
  modalValues: { fontWeight: '700', fontSize: 15 },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
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
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  modalText: {
    marginBottom: 15,
  },
});
