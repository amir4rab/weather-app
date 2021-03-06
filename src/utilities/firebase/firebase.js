import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = app.auth();
export const database = app.database();



export const persistenceSignin = ( email, password ) => (
    new Promise(( resolve, reject ) => {
        app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then( _=>{
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then( res => resolve(res) )
                    .catch( err => reject(err) );
            })
}));
export const persistenceSignup = ( email, password ) => (
    new Promise(( resolve, reject ) => {
        app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then( _=>{
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then( res => resolve(res) )
                    .catch( err => {
                        reject(err);
                        console.log(err);
                    });
            })
}));
export const persistenceSignwithGoogle = _ => {

    const provider = new firebase.auth.GoogleAuthProvider();

    return new Promise(( resolve, reject ) => {
        app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then( _=>{
                firebase.auth().signInWithPopup(provider)
                    .then( res => resolve(res) )
                    .catch( err => reject(err) );
            })
    });
}



export const userObserver = new Promise(( resolve ) => {
        firebase.auth().onAuthStateChanged(
            user => resolve(user)
        )
    });



export default app;