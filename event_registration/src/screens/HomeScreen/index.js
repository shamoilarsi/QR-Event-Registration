import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import Typography from '../../constants/Typography';
import { writeFile, DownloadDirectoryPath, mkdir } from 'react-native-fs';

import ListItem from '../../components/HomeListItem';
import DataContext from '../../contexts/DataContext';

export default function HomeScreen({ navigation }) {
  const { firebaseDetails, isAdmin, registrations } = useContext(DataContext);
  let events = null;

  if (firebaseDetails) {
    events = firebaseDetails.events;
  }

  const downloadReport = async () => {
    const exportDirectory = DownloadDirectoryPath + '/EventRegistration';
    mkdir(exportDirectory);

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const eventRegistrations = Object.values(registrations);
        const eventIDs = Object.keys(registrations);
        let exportList = [];

        eventRegistrations.forEach((val, idx) => {
          const regID = Object.keys(val);
          const regData = Object.values(val);
          const sheet = [];

          regData.forEach((val, idx) => {
            sheet.push({ ...val, registrationID: regID[idx] });
          });
          exportList.push({ [eventIDs[idx]]: sheet });

          // let exportString = 'data:text/csv;charset=utf-8,';
          let exportString =
            'Name,Email,Number,College,Slot,Attended,Volunteer,RegID,\r\n';
          sheet.forEach((val) => {
            exportString += `${val.name},${val.email},${val.number},${val.college},${val.slot},${val.attended},${val.volunteer},${val.registrationID},\r\n`;
          });

          writeFile(exportDirectory + `/${eventIDs[idx]}.csv`, exportString)
            .then(() =>
              ToastAndroid.show(
                'Exported to \n' + exportDirectory,
                ToastAndroid.LONG,
              ),
            )
            .catch((e) => console.error(e));
        });
      } else {
        alert('Storage permission is necessary to create the report');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View
      style={{
        height: '100%',
        paddingVertical: 20,
        backgroundColor: '#ffffff',
      }}>
      <View style={{ marginHorizontal: 15 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ ...Typography.heading, marginBottom: 30 }}>
            Welcome to Tectonic 2021
          </Text>
        </View>
        {isAdmin && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={styles.adminBtn}
              onPress={() => {
                downloadReport();
              }}>
              <Text style={styles.adminBtnText}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.adminBtn}
              onPress={() => {
                navigation.navigate('QRScanScreen', {});
              }}>
              <Text style={styles.adminBtnText}>Scan</Text>
            </TouchableOpacity>
          </View>
        )}

        {firebaseDetails ? (
          <View style={{ marginVertical: 20 }}>
            <Text style={Typography.label}>
              Here are the events organised this year
            </Text>

            {events.map((val, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => navigation.navigate('Event', { event: val })}
                activeOpacity={0.6}>
                <ListItem
                  logo={val.image}
                  title={val.title}
                  desc={val.description}
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Text style={Typography.title}>Loading...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adminBtn: {
    backgroundColor: '#03A9F4',
    paddingVertical: 5,
    width: '40%',
    alignItems: 'center',
    borderRadius: 50,
  },
  adminBtnText: {
    ...Typography.label,
    color: '#fff',
  },
});
