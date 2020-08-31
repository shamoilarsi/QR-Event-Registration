import React, { useEffect, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import auth from '@react-native-firebase/auth';

import Firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

import NoInternet from './src/components/NoInternet';
import DataContext from './src/contexts/DataContext';

/* This file contains all the Firestore functions and initializes the DataContext */

const App = () => {
  const [user, setUser] = useState(null);
  const [firebaseDetails, setFirebaseDetails] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); // TODO: set false by default
  const [isConnected, setIsConnected] = useState(true);
  const [registrations, setRegistrations] = useState(null);

  // Subscribed to check for internet connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  // Handle Social-Media SignIn here
  async function AnonymousLogin() {
    return auth().signInAnonymously();
  }

  useEffect(() => {
    (async () => {
      const { user: localUser } = await AnonymousLogin();
      setUser(localUser.providerData[0]);
    })();

    // get all events data from the details document
    (async () => {
      let collection = await Firestore()
        .collection('demo-event')
        .doc('details')
        .get();

      collection = collection.data();
      setFirebaseDetails(collection);
    })();
  }, []);

  // whenever firebaseDetails and user are updated, a useEffect is triggered to check for admin rights
  useEffect(() => {
    if (firebaseDetails && user) {
      setIsAdmin(firebaseDetails.admins.includes(user.email));
    }
  }, [firebaseDetails, user]);

  // if isAdmin state is changed, the registration document is fetched
  useEffect(() => {
    if (isAdmin) {
      const unsubscribe = Firestore()
        .collection('demo-event')
        .doc('registrations')
        .onSnapshot((doc) => {
          setRegistrations(doc.data());
        });

      return () => unsubscribe();
    }
  }, [isAdmin]);

  // registering a user for an event
  const registerParticipant = async (data, eventId) => {
    if (isConnected) {
      // generating a random id
      const id = Math.random().toString(36).substring(8);

      await Firestore()
        .collection('demo-event')
        .doc('registrations')
        .set(
          {
            [eventId]: {
              [id]: {
                ...data,
                attended: false,
                timestamp: Firestore.FieldValue.serverTimestamp(),
              },
            },
          },
          { merge: true },
        );
      return `${eventId}/${id}`;
    }

    return false;
  };

  // when QR is scanned and confirmed, attendance of the user is marked
  const setAttended = async (eventId, id) => {
    await Firestore()
      .collection('demo-event')
      .doc('registrations')
      .set({ [eventId]: { [id]: { attended: true } } }, { merge: true });
  };

  return (
    <>
      <DataContext.Provider
        value={{
          user,
          firebaseDetails,
          isAdmin,
          registerParticipant,
          isConnected,
          registrations,
          setAttended,
        }}>
        <AppNavigator />
        <NoInternet isConnected={isConnected} />
      </DataContext.Provider>
    </>
  );
};

export default App;
