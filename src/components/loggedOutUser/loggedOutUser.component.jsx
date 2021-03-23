import { useState, useEffect } from 'react';

import classes from './loggedOutUser.module.scss';
import './component.styles.scss';

import { useFirebaseContext } from '../../utilities/firebase/context/firebase.context'

import LoginFrom from './loginFrom/login.from';
import SignupFrom from './sigupFrom/signup.from';

const LoggedOutUser = _ => {
    const {
        signup,
        signin,
        signinWithGoogle,
        persistenceSignin
    } = useFirebaseContext();

    const [ fireBaseErrorResponse, setFireBaseErrorResponse ] = useState(false);

    const [ signState, setSignState ] = useState(true);

    useEffect(() => {
        setFireBaseErrorResponse(null);
    }, [signState])

    const initSignup = ( email, password ) => {
        // console.log( email, password );
        signup( email, password )
            .then( res => {
                // console.log(res);
            })
            .catch( err => {
                // console.log(err);
                setFireBaseErrorResponse(err.message);
            });
    }

    const initSignin = ( email, password ) => {
        // console.log( email, password )
        console.log('runn!')
        persistenceSignin( email, password )
            .then( res => {
                console.log(res);
            })
            .catch( err => {
                console.log(err);
                setFireBaseErrorResponse(err.message);
            });
        // signin( email, password )
        //     .then( res => {
        //         // console.log(res);
        //     })
        //     .catch( err => {
        //         // console.log(err);
        //         setFireBaseErrorResponse(err.message);
        //     });
    }

    const initSigninWithGoolge = _ => {
        signinWithGoogle()
            .then( res => {
                // console.log(res);
            })
            .catch( err => {
                // console.log(err);
                setFireBaseErrorResponse(err.message);
            });
    }

    return (
        <div className={ classes.main }>
            <div>
                <h2 className={ classes.title } >
                    Login or Signup by one of the Following options
                </h2>
                <div className={ classes.oneBtnOptions }>
                    <button 
                        className={ classes.oneBtnOptions_wg }
                        onClick={initSigninWithGoolge}
                    >
                        login with Google
                    </button>
                </div>
                <div className={ classes.signOptions }>
                    <div className={ classes.signOptions_btns }>
                        <button className={ `stateBtns` } onClick={ _ => setSignState(true) } disabled={signState}>sign up</button>
                        <button className={ `stateBtns` } onClick={ _ => setSignState(false) } disabled={!signState}>sign in</button>
                    </div>
                    <div>
                        {
                            signState ? 
                            <SignupFrom initSignup={initSignup} firebaseErrStr={fireBaseErrorResponse}/>
                            :
                            <LoginFrom initSignin={initSignin} firebaseErrStr={fireBaseErrorResponse}/>
                        }
                    </div>
                </div>
            </div>         
        </div>
    )
}

export default LoggedOutUser;