import { useState } from 'react';

import classes from './loggedOutUser.module.scss';
import './component.styles.scss';

import { useFirebaseContext } from '../../utilities/firebase/context/firebase.context'

import LoginFrom from './loginFrom/login.from';
import SignupFrom from './sigupFrom/signup.from';

const LoggedOutUser = ({  }) => {
    const {
        signup,
        signin,
    } = useFirebaseContext();

    const [ signState, setSignState ] = useState(true);

    const initSignup = ( email, password ) => {
        // console.log( email, password );
        signup( email, password )
            .then( res => {
                console.log(res);
            })
            .catch( err => console.log(err) );
    }

    const initSignin = ( email, password ) => {
        // console.log( email, password )
        signin( email, password )
            .then( res => {
                console.log(res);
            })
            .catch( err => console.log(err) );
    }

    return (
        <div className={ classes.main }>
            <div>
                <h2 className={ classes.title } >
                    Login or Signup by one of the Following options
                </h2>
                <div className={ classes.oneBtnOptions }>
                    <button className={ classes.oneBtnOptions_wg }>
                        login with Google
                    </button>
                </div>
                <div className={ classes.signOptions }>
                    <div className={ classes.signOptions_btns }>
                        <button className={ `stateBtns` } onClick={ _ => setSignState(false) } disabled={!signState}>sign in</button>
                        <button className={ `stateBtns` } onClick={ _ => setSignState(true) } disabled={signState}>sign up</button>
                    </div>
                    <div>
                        {
                            signState ? 
                            <SignupFrom initSignup={initSignup} />
                            :
                            <LoginFrom initSignin={initSignin} />
                        }
                    </div>
                </div>
            </div>         
        </div>
    )
}

export default LoggedOutUser;