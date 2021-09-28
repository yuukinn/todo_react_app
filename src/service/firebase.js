import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_FIREBASE_APP_ID
});

export const auth = firebase.auth();
export const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider()

//ログイン機能
export const signWithGoogle = () =>{
    firebase.auth().signInWithPopup(provider).then(result=> {
        console.log(result.user);
    })
    .catch(error =>{
        console.log(error.message)
    })
    
}

//ログアウト機能
export const logOut = () =>{
    firebase.auth().signOut().then(result=> {
        console.log("logged out");
        document.location.reload();
    })
    .catch(error =>{
        console.log(error.message)
    })
}

