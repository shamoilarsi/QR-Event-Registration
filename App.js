import React, { useEffect, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import auth from '@react-native-firebase/auth';

import Firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

import NoInternet from './src/components/NoInternet';
import DataContext from './src/contexts/DataContext';

const App = () => {
  const [user, setUser] = useState(null);
  const [firebaseDetails, setFirebaseDetails] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); //set false here by default
  const [isConnected, setIsConnected] = useState(true);
  const [registrations, setRegistrations] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isInternetReachable);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Handle Google SignIn here
  async function AnonymousLogin() {
    return auth().signInAnonymously();
  }

  useEffect(() => {
    (async () => {
      const { user } = await AnonymousLogin();
      setUser(user.providerData[0]);
      console.log(user);
    })();

    (async () => {
      let collection = await Firestore()
        .collection('demo-event')
        .doc('details')
        .get();

      collection = collection.data();
      setFirebaseDetails(collection);
    })();
  }, []);

  // uncomment this to setAdmin when using GoogleLogin
  // useEffect(() => {
  //   if (firebaseDetails && user)
  //     setIsAdmin(firebaseDetails.admins.includes(user.email));
  // }, [firebaseDetails, user]);

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

  const registerParticipant = async (data, eventId) => {
    if (isConnected) {
      const id = Math.random().toString(36).substring(8);

      await Firestore()
        .collection('demo-event')
        .doc('registrations')
        .set(
          { [eventId]: { [id]: { ...data, attended: false } } },
          { merge: true },
        );
      return `${eventId}/${id}`;
    }

    return false;
  };

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
