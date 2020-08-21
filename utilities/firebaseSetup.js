import 'firebase/auth'; // If you need it
import 'firebase/firestore'; // If you need it
import 'firebase/storage'; // If you need it
import 'firebase/analytics'; // If you need it

import firebase from 'firebase/app';

const clientCredentials = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}
// Check that `window` is in scope for the analytics module!
if (typeof window !== 'undefined') {
  // To enable analytics. https://firebase.google.com/docs/analytics/get-started
  if ('measurementId' in clientCredentials) firebase.analytics();
}

export default firebase;
