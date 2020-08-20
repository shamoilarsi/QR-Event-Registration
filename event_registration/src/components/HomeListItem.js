import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Typography from '../constants/Typography';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function HomeListItem({ title, desc, logo }) {
  return (
    <View style={styles.outerContainer}>
      <Image style={styles.image} source={{ uri: logo }} />
      <View style={styles.textContainer}>
        <Text style={Typography.title}>{title}</Text>
        <Text style={Typography.desc} numberOfLines={4} ellipsizeMode="tail">
          {desc}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 15,
    backgroundColor: '#00000010',
    marginHorizontal: RFPercentage(2),
    flexDirection: 'row',
  },
  image: { width: 120, height: 120, borderRadius: 10 },
  textContainer: {
    marginHorizontal: RFPercentage(2),
    marginVertical: RFPercentage(1),
    flex: 1,
  },
});
