import firebase from 'firebase' // Importing firebase

import 'firebase/firestore'   // Initialize Firebase

const firebaseConfig = {   
      // Your web app's Firebase configuration
     
        apiKey: "AIzaSyC_3DLu_rZhRxleONb4Unql2kcbCFldLEQ",
        authDomain: "todosapp-b7911.firebaseapp.com",
        databaseURL: "https://todosapp-b7911.firebaseio.com",
        projectId: "todosapp-b7911",
        storageBucket: "todosapp-b7911.appspot.com",
        messagingSenderId: "878100532962",
        appId: "1:878100532962:web:38e1fbc51ff2ed3fd098bb",
        measurementId: "G-B80XLDTZWM"
      };
    
     
  

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const firestore = firebaseApp.firestore()
  

  export default firestore