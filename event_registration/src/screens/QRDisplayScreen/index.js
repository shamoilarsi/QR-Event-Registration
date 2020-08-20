import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRDisplayScreen({ navigation, route }) {
  const { details, id, event } = route.params;
  console.log(details);
  return (
    <View>
      <Text>
        Registration Code for {details.name} for event {event.title}
      </Text>
      <QRCode value={id} size={200} />
      <Text>{id}</Text>
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
  );
}

const styles = StyleSheet.create({});
