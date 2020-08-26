import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import Typography from '../../constants/Typography';

export default function QRDisplayScreen({ navigation, route }) {
  const { details, id } = route.params;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={Typography.title}>Unique QR for</Text>
        <Text style={styles.name}>{details.name}</Text>
        <Text style={Typography.label}>{details.slot}</Text>
      </View>

      <View style={styles.QRContainer}>
        <QRCode value={id} size={200} />
        <Text style={styles.idText}>{id}</Text>
      </View>
      <View style={styles.btn}>
        <Button
          title="Go Home"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { height: '100%', backgroundColor: '#fff' },
  innerContainer: { alignItems: 'center', marginTop: 30 },
  idText: { ...Typography.label, marginTop: 20 },
  name: { ...Typography.heading, textTransform: 'capitalize' },
  QRContainer: { alignItems: 'center', marginVertical: 50 },
  btn: { position: 'absolute', bottom: 15, left: 10, right: 10 },
});
