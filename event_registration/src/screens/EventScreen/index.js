import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Typography from '../../constants/Typography';

export default function EventScreen({ navigation, route }) {
  const { event } = route.params;
  return (
    <View>
      <Text style={Typography.heading}>Event Screen</Text>
      <Text>{event['title']}</Text>
      <Text>{event['description']}</Text>
      <Text>{event['price']}</Text>
      <Text>{JSON.stringify(event['coordinators'], null, 2)}</Text>

      <Button
        title="lol"
        onPress={() => {
          navigation.navigate('Register', { event });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
