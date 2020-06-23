import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCjuK8ao3oNVBRwYrmKotUahQhTA6wbl_4",
  authDomain: "timeentry-7378b.firebaseapp.com",
  databaseURL: "https://timeentry-7378b.firebaseio.com",
  projectId: "timeentry-7378b",
  storageBucket: "timeentry-7378b.appspot.com",
  messagingSenderId: "792060188887",
  appId: "1:792060188887:web:d63ebfd1948dbc3271f892",
  measurementId: "G-JD4B44BSL4"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase