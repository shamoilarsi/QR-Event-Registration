const firebase = require('firebase');
const data = require('./firestore.json');

// find these entries while registering you web app in firebase
firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
});

const db = firebase.firestore();

// make sure the list of dates is in milliseconds
data.data.events.forEach((val) => {
  val.slots.forEach(
    (milliSeconds, idx) =>
      (val.slots[idx] = firebase.firestore.Timestamp.fromDate(
        new Date(milliSeconds),
      )),
  );
});

db.collection(data.collectionName).doc(data.documentName).set(data.data);
