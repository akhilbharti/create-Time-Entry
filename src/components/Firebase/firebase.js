import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyCjuK8ao3oNVBRwYrmKotUahQhTA6wbl_4",
  authDomain: "timeentry-7378b.firebaseapp.com",
  databaseURL: "https://timeentry-7378b.firebaseio.com",
  projectId: "timeentry-7378b",
  storageBucket: "timeentry-7378b.appspot.com",
  messagingSenderId: "792060188887",
  appId: "1:792060188887:web:d63ebfd1948dbc3271f892",
  measurementId: "G-JD4B44BSL4"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
       
  }

  // *** Auth API ***
  getContent = () => this.db.collection("timer").get()
   

  addEntry = (id, reqStruct) => this.db.collection('timer').doc(id).set(reqStruct);

  generateKey = () => this.db.collection('timer').doc().id;
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
  // timer =()=> this.db.ref('boards');
}

export default Firebase;
