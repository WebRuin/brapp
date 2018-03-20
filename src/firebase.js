import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyARaUNuU82OfIdDE1T4EcHBxVlw1FbpeuE",
  authDomain: "ipeefreely-c2161.firebaseapp.com",
  databaseURL: "https://ipeefreely-c2161.firebaseio.com",
  projectId: "ipeefreely-c2161",
  storageBucket: "ipeefreely-c2161.appspot.com",
  messagingSenderId: "908600995347"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;