// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD049vRuQw9-60ZNbx0S9JRZjIIkkL1gUE',
  authDomain: 'theloginapp-a4505.firebaseapp.com',
  databaseURL: 'https://project-46666739079.firebaseio.com',
  storageBucket: 'theloginapp-a4505.appspot.com',
};
firebase.initializeApp(firebaseConfig);

export default firebase;
