import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA3GYtjnubP732BnGG1PyJpHJiYzK3Xba8',
  authDomain: 'sindicato-315002.firebaseapp.com',
  databaseURL: 'sindicato-315002-default-rtdb.firebaseio.com',
  projectId: 'sindicato-315002',
  storageBucket: 'sindicato-315002.appspot.com',
  messagingSenderId: '116693387916',
};

firebase.initializeApp(config);
const auth = firebase.auth();

const database = firebase.database();
export { auth, database };
