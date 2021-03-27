import 'firebase/database';

import { createContext, useContext, useState, useEffect } from 'react';
import { 
    auth, 
    googleAuthProvider, 
    persistenceSignin, 
    userObserver,
    persistenceSignup,
    persistenceSignwithGoogle,
    database,
    getCurrUser
} from '../firebase';

const FirebaseContext = createContext();

const FirebaseProvider =  ({ children }) => {
    const [ currUser, setCurrUser ] = useState({
        user: null,
        loading: true
    });

    useEffect( _ => {
        userObserver
            .then( user => {
                setCurrUser( currState => ({
                    ...currState,
                    user: user,
                    loading: false
                }))
            });
    },[]);


    //**  signup methodes  **//
    const signup = ( email, password ) => {
        return new Promise(( resolve, reject ) => {
            auth.createUserWithEmailAndPassword( email, password ).set
                .then( user => {
                    setCurrUser(user);
                    resolve(user);
                })
                .catch( err => reject(err));

        });
    };

    const persistenceSignupFn = ( email, password ) => {
        return new Promise(( resolve, reject ) => {
            persistenceSignup( email, password ).set
                .then( user => {
                    setCurrUser( currState => ({
                        ...currState,
                        user: user,
                    }))
                    resolve(user);
                })
                .catch( err => reject(err));

        });
    };

    //**  signin methodes  **//
    const signin = ( email, password ) => {
        return new Promise(( resolve, reject ) => {
            auth.signInWithEmailAndPassword( email, password )
                .then( user => {
                    setCurrUser( currState => ({
                        ...currState,
                        user: user,
                    }))
                    resolve(user);
                })
                .catch( err => reject(err));
        });
    };

    const persistenceSigninFn = ( email, password ) => {
        return new Promise(( resolve, reject ) => {
            persistenceSignin( email, password )
                .then( user => {
                    setCurrUser( currState => ({
                        ...currState,
                        user: user,
                    }))
                    resolve(user);
                })
                .catch( err => reject(err) );
        })
    }

    //**  signout methodes  **//
    const signout = _ => {
        return new Promise(( resolve, reject ) => {
            auth.signOut()
                .then( _ => {
                    setCurrUser( currState => ({
                        ...currState,
                        user: null,
                    }))
                    resolve(null);
                })
                .catch( err => reject(err) );
        });
    };


    //**  signin with google methodes  **//
    const signinWithGoogle = _ => {
        return new Promise(( resolve, reject ) => {
            auth.signInWithPopup(googleAuthProvider)
                .then( user => {
                    setCurrUser( currState => ({
                        ...currState,
                        user: user
                    }))
                    resolve(user);
                })
                .catch( err => reject(err) );
        })
    }

    const persistenceSignwithGoogleFn = _ => {
        return new Promise(( resolve, reject ) => {
            persistenceSignwithGoogle()
                .then( user => {
                    setCurrUser( currState => ({
                        ...currState,
                        user: user
                    }))
                    resolve(user);
                })
                .catch( err => reject(err) );
        })
    }

    const setData = (data) => (
        new Promise(( resolve, reject ) => {
            database.ref( 'users/' + auth.currentUser.uid ).set({
                ...data
            })
                .then( res => resolve(res) )
                .catch( err => reject(err) );
        })
    );

    const getData = _ => (
        new Promise(( resolve, reject ) => {
            const dataRef = database.ref( 'users/' + auth.currentUser.uid );
            dataRef.once('value', (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            })
                .catch( err => reject(err) )
        })
    )
    
    const getCurrUser = auth.currentUser;

    //**  exporting value  **//
    const values = {
        signup,
        signin,
        signout,
        signinWithGoogle,
        persistenceSignin: persistenceSigninFn,
        persistenceSignup: persistenceSignupFn,
        persistenceSignwithGoogle: persistenceSignwithGoogleFn,
        getCurrUser,
        user: currUser.user,
        loading: currUser.loading,
        setData,
        getData
    };


    return (
        <FirebaseContext.Provider value={values}>
            { children }
        </FirebaseContext.Provider>
    );
}

export const useFirebaseContext = _ => useContext(FirebaseContext);

export default FirebaseProvider;