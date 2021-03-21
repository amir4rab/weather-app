import 'firebase/database';

import { createContext, useContext, useState } from 'react';
import { auth, database, googleAuthProvider } from '../firebase';

const FirebaseContext = createContext();

const FirebaseProvider =  ({ children }) => {
    const [ currUser, setCurrUser ] = useState(null);

    const signup = ( email, password ) => {
        console.log('runned!')
        return new Promise(( resolve, reject ) => {
            auth.createUserWithEmailAndPassword( email, password )
                .then( user => {
                    setCurrUser(user);
                    resolve(user);
                })
                .catch( err => reject(err));

        });
    };

    const signin = ( email, password ) => {
        return new Promise(( resolve, reject ) => {
            auth.signInWithEmailAndPassword( email, password )
                .then( user => {
                    setCurrUser(user);
                    resolve(user);
                })
                .catch( err => reject(err));
        });
    };

    const signout = _ => {
        return new Promise(( resolve, reject ) => {
            auth.signOut()
                .then( _ => {
                    setCurrUser(null);
                    resolve(null);
                })
                .catch( err => reject(err) );
        });
    };



    const values = {
        signup,
        signin,
        signout,
        user: currUser
    };

    return (
        <FirebaseContext.Provider value={values}>
            { children }
        </FirebaseContext.Provider>
    );
}

export const useFirebaseContext = _ => useContext(FirebaseContext);

export default FirebaseProvider;