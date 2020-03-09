  import firebase from 'firebase/app';
  import 'firebase/database';
  import 'firebase/auth';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDq9akTOqomfV_jSo5F8CuMoo1SR-VRvLY",
    authDomain: "react-spas-a8ae4.firebaseapp.com",
    databaseURL: "https://react-spas-a8ae4.firebaseio.com",
    projectId: "react-spas-a8ae4",
    storageBucket: "react-spas-a8ae4.appspot.com",
    messagingSenderId: "691144870275",
    appId: "1:691144870275:web:2500f528a81b304d2c0eb6",
    measurementId: "G-JEWT647847"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;