/* eslint-disable no-alert */
import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  ScrollView,
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

        eventRegistrations.forEach((val, idx) => {
          const regID = Object.keys(val);
          const regData = Object.values(val);
          const sheet = [];

          regData.forEach((data, index) => {
            sheet.push({ ...data, registrationID: regID[index] });
          });

          // let exportString = 'data:text/csv;charset=utf-8,';
          let exportString =
            'Name,Email,Number,College,Slot,Attended,Volunteer,RegID,\r\n';
          sheet.forEach(
            ({
              name,
              email,
              number,
              college,
              slot,
              attended,
              volunteer,
              registrationID,
            }) => {
              exportString += `${name},${email},${number},${college},${slot},${attended},${volunteer},${registrationID},\r\n`;
            },
          );

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
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Event Registration</Text>
        </View>
        {isAdmin && (
          <View style={styles.adminOptionContainer}>
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
                navigation.navigate('QRScan', {});
              }}>
              <Text style={styles.adminBtnText}>Scan</Text>
            </TouchableOpacity>
          </View>
        )}

        {firebaseDetails ? (
          <View style={styles.mainContainer}>
            <Text style={Typography.label}>
              Here are the events organised this year
            </Text>

            <ScrollView>
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
            </ScrollView>
          </View>
        ) : (
          <View style={styles.loading}>
            <Text style={Typography.title}>Loading...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: '100%',
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  innerContainer: { marginHorizontal: 15 },
  headerContainer: {
    alignItems: 'center',
  },
  header: {
    ...Typography.heading,
    marginBottom: 30,
  },
  adminOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
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
  mainContainer: { marginVertical: 20 },
  loading: { alignItems: 'center', marginTop: 30 },
});
