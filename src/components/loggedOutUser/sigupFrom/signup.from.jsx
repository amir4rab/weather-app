import { createRef, useState } from 'react';

import validator from 'email-validator';
import passwordValidator  from 'password-validator';

import '../component.styles.scss';

//**  password validator settings  **//

const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)
    .is().max(24)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

//**  password validator settings  **//

const SignupFrom = ({ initSignup, firebaseErrStr }) => {

    //**   Email word sate and checks  **//

    const [ emailState, setEmailState ] = useState({
        isTrue: false,
        touched: false,
        err: null
    });
    const emailInput = createRef();
    const checkEmail = () => {
        if ( validator.validate(emailInput.current.value) ){
            setEmailState(currState => ({
                ...currState,
                touched: true,
                isTrue: true
            }));
        } else {
            setEmailState(currState => ({
                ...currState,
                touched: true,
                isTrue: false
            }));
        }
    }

    //**   Email word sate and checks  **//


    //**   pass word sate and checks  **//

    const [ password, setPassword ] = useState({
        isTrue: false,
        repeateIsFalse: false,
        repeateIstouched: false,
        touched: false,
        err: null
    });
    const passwordInput = createRef();
    const passwordRepeatInput = createRef();
    const checkPassword = () => {
        if( passwordSchema.validate(passwordInput.current.value) ){
            setPassword(currState => ({
                ...currState,
                touched: true,
                isTrue: true
            }));
        } else {
            setPassword(currState => ({
                ...currState,
                touched: true,
                isTrue: false
            }));
        }
    }
    const checkPasswordRepeat = () => {
        if( passwordInput.current.value === passwordRepeatInput.current.value ){
            setPassword(currState => ({
                ...currState,
                repeateIstouched: true,
                repeateIsFalse: false
            }));
        } else {
            setPassword(currState => ({
                ...currState,
                repeateIstouched: true,
                repeateIsFalse: true
            }));
        }
    }

    //**   pass word sate and checks  **//
    

    const initSignupFn = () => {
        initSignup(
            emailInput.current.value,
            passwordInput.current.value
        );
    }

    return (
        <form className={ `main` } onSubmit={ e => e.preventDefault() }>
            <h4 className={ `title` }>
                Signup
            </h4>
            <div className={ `inputGroup` }>
                <label className={ `inputGroup_label` }>Email</label>
                <input 
                    className={[ 
                        `inputGroup_input`,
                        `${ !emailState.isTrue && emailState.touched ? `false` : '' }`,
                        `${ emailState.isTrue ? `true` : '' }`,
                    ].join(' ')} 
                    ref={ emailInput } 
                    type="email"
                    onKeyUp={checkEmail}
                    />
            </div>
            <div className={ `inputGroup` }>
                <label className={ `inputGroup_label` }>Password</label>
                <input 
                    className={[ 
                        `inputGroup_input`,
                        `${ !password.isTrue && password.touched  ? `false` : null }`,
                        `${ password.isTrue ? `true` : null }`, 
                    ].join(' ')}
                    onKeyUp={ checkPassword }
                    ref={ passwordInput } 
                    type="password"
                />
            </div>
            <div className={ `inputGroup` }>
                <label className={ `inputGroup_label` }>repeat your password</label>
                <input 
                    className={[
                        `inputGroup_input`,
                        `${ password.repeateIsFalse && password.repeateIstouched ? `false` : null }`,
                        `${ !password.repeateIsFalse && password.repeateIstouched ? `true` : null }`,
                    ].join(' ')} 
                    ref={ passwordRepeatInput } 
                    onKeyUp={ checkPasswordRepeat } 
                    type="password"
                />
            </div>
            <p className={ `errorRes` }>{firebaseErrStr}</p>
            <button 
                className={ `submitBtn` } 
                onClick={ initSignupFn }
                disabled={ !((!password.repeateIsFalse && password.repeateIstouched) && password.isTrue && emailState.isTrue) }
            >
                Submit
            </button>
        </form>
    );
};

export default SignupFrom;