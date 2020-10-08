
import app from 'firebase/app';

import auth from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBkLw9qW4p6ub4EqPD8wiWsBUAeXQ_R_vc",
    authDomain: "the-third-santa-c1154.firebaseapp.com",
    databaseURL: "https://the-third-santa-c1154.firebaseio.com",
    projectId: "the-third-santa-c1154",
    storageBucket: "the-third-santa-c1154.appspot.com",
    messagingSenderId: "979966035420",
    appId: "1:979966035420:web:849cdc45681a3db5437b19",
    measurementId: "G-5095WHPBM0"
  };
 
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth=app.auth();
  }

  doCreateUserWithEmailAndPassword=(email,password)=>
      this.auth.createUserWithEmailAndPassword(email,password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

}
 
export default Firebase;



