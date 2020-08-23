import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Typography from '../constants/Typography';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function HomeListItem({ title, desc, logo }) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: logo }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={Typography.title}>{title}</Text>
        <Text style={Typography.desc} numberOfLines={3} ellipsizeMode="tail">
          {desc}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 15,
    backgroundColor: '#f6f8fa',
    flexDirection: 'row',
    marginBottom: RFPercentage(2),
    // elevation: 2,
  },
  image: { width: 90, height: 90, borderRadius: 10 },
  textContainer: {
    marginHorizontal: RFPercentage(2.3),
    marginVertical: RFPercentage(1.5),
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
  },
});
