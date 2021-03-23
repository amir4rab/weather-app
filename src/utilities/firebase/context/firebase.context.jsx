import 'firebase/database';

import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleAuthProvider, persistenceSignin, userObserver } from '../firebase';

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

    const signinWithGoogle = _ => {
        return new Promise(( resolve, reject ) => {
            auth.signInWithPopup(googleAuthProvider)
                .then( res => {
                    setCurrUser(res);
                    resolve(res);
                })
                .catch( err => reject(err) );
        })
    }

    const persistenceSigninFn = ( email, password ) => {
        return new Promise(( resolve, reject ) => {
            persistenceSignin( email, password )
                .then( res => {
                    setCurrUser(res);
                    resolve(res);
                })
                .catch( err => reject(err) );
        })
    }

    // // useEffect(() => {
        
    // //     // auth().onAuthStateChanged(user => {
    // //     //     if (user) {

    // //     //     } else {

    // //     //     }

    // //     const user = ;
    // //     if()

    // //     })

    //     return () => {
            
    //     }
    // }, [])

    const values = {
        signup,
        signin,
        signout,
        signinWithGoogle,
        persistenceSignin: persistenceSigninFn,
        user: currUser.user,
        loading: currUser.loading
    };

    return (
        <FirebaseContext.Provider value={values}>
            { children }
        </FirebaseContext.Provider>
    );
}

export const useFirebaseContext = _ => useContext(FirebaseContext);

export default FirebaseProvider;