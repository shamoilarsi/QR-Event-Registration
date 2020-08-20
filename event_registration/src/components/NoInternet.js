import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NoInternet({ isConnected }) {
  return (
    <View>
      {!isConnected && (
        <View style={styles.noInternet}>
          <Text style={styles.text}>Cannot reach servers</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noInternet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: '#333',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
