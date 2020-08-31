import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Typography from '../../constants/Typography';
import DataContext from '../../contexts/DataContext';

const { width, height } = Dimensions.get('screen');

export default function EventScreen({ navigation, route }) {
  const { isAdmin } = useContext(DataContext);
  const { event } = route.params;
  const {
    image,
    title,
    description,
    price,
    coordinators,
    slots,
    prizes,
  } = event;

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Image style={styles.image} source={{ uri: image }} />
        <Text style={Typography.heading}>{title}</Text>
        <Text style={Typography.eventDesc}>{description}</Text>
        <Text style={styles.section}>Price: {price}</Text>

        {prizes && (
          <>
            <Text style={styles.section}>Prizes</Text>
            {prizes.map((val, idx) => (
              <Text key={idx} style={Typography.eventDesc}>
                {val.title} - {val.reward}
              </Text>
            ))}
          </>
        )}

        {slots && (
          <>
            <Text style={styles.section}>Slots Available</Text>
            {slots.map((val, idx) => (
              <Text key={idx} style={Typography.eventDesc}>
                {new Date(val.toDate()).toLocaleString()}
              </Text>
            ))}
          </>
        )}

        {coordinators && (
          <>
            <Text style={styles.section}>Coordinators</Text>
            {coordinators.map((val, idx) => (
              <Text key={idx} style={Typography.eventDesc}>
                {val.name} - {val.number}
              </Text>
            ))}
            <Text style={{ ...Typography.eventDesc, fontSize: 14 }}>
              For any doubts or registration, feel free to contact the
              coordinators.
            </Text>
          </>
        )}

        {isAdmin && (
          <View style={styles.btn}>
            <Button
              title="Register"
              onPress={() => {
                navigation.navigate('Register', { event });
              }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: width - 20, height: height / 4, borderRadius: 10 },
  section: {
    ...Typography.title,
    marginTop: 20,
  },
  mainContainer: { paddingVertical: 20, paddingHorizontal: 10 },
  btn: { marginTop: 30 },
});
