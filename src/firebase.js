import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyA3nJhzhf_M1ZXIGpJ2qmMy4mIYmPk4Fbk",
    authDomain: "nwitter-8b812.firebaseapp.com",
    projectId: "nwitter-8b812",
    storageBucket: "nwitter-8b812.appspot.com",
    messagingSenderId: "6802160194",
    appId: "1:6802160194:web:a51cc5762c8732bdc00bdb"
};

export default firebase.initializeApp(firebaseConfig);