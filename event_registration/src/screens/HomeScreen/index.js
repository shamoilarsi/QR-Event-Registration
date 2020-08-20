import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Button,
} from 'react-native';
import Typography from '../../constants/Typography';

import ListItem from '../../components/HomeListItem';
import DataContext from '../../contexts/DataContext';

export default function HomeScreen({ navigation }) {
  const { firebaseDetails } = useContext(DataContext);
  let events = null;

  if (firebaseDetails) {
    events = firebaseDetails.events;
  }

  return (
    <View>
      <Text style={Typography.heading}>Home Screen</Text>

      {firebaseDetails ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('Event', { event: events[0] })}
          activeOpacity={0.6}>
          <ListItem
            logo={events[0].image}
            title={events[0].title}
            desc={events[0].description}
          />
        </TouchableOpacity>
      ) : (
        <Text> LOADING BRO... </Text>
      )}

      <Button
        title="Scan"
        onPress={() => {
          navigation.navigate('QRScanScreen', {});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
