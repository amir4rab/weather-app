import { createRef, useState } from 'react';

import validator from 'email-validator';
import passwordValidator  from 'password-validator';

import '../component.styles.scss';

const SignupFrom = ({ initSignup }) => {
    const [ emailState, setEmailState ] = useState({
        isTrue: false,
        touched: false,
        err: null
    });
    const emailInput = createRef();
    
    const [ password, setPassword ] = useState({
        isTrue: false,
        repeateIsFalse: false,
        touched: false,
        err: null
    });
    const passwordInput = createRef();
    
    const passwordRepeatInput = createRef();

    const initSignupFn = () => {
        initSignup(
            emailInput.current.value,
            passwordInput.current.value
        );
    }

    const checkPasswordRepeat = (e) => {
        // console.log( e )
        if ( e.target.value !== passwordInput.current.value ) {
            console.log('dont match')
        } else {
            console.log('math')
        }
    }

    console.log(validator.validate('@test.com'));

    return (
        <form className={ `main` } onSubmit={ e => e.preventDefault() }>
            <h4 className={ `title` }>
                sign up
            </h4>
            <div className={ `inputGroup` }>
                <label className={ `inputGroup_label` }>Email</label>
                <input className={ `inputGroup_input ${ !emailState.isTrue && emailState.touched ? `false` : '' } ` } ref={ emailInput } type="email"/>
            </div>
            <div className={ `inputGroup` }>
                <label className={ `inputGroup_label` }>Password</label>
                <input 
                    className={ `inputGroup_input ${ ( !password.isTrue && password.touched ) || password.repeateIsFalse ? `false` : '' } ` } 
                    ref={ passwordInput } 
                    type="password"
                />
            </div>
            <div className={ `inputGroup` }>
                <label className={ `inputGroup_label` }>repeat your password</label>
                <input 
                    className={ `inputGroup_input` } 
                    ref={ passwordRepeatInput } 
                    onKeyUp={ checkPasswordRepeat } 
                    type="password" show
                />
            </div>
            <button className={`submitBtn`} onClick={initSignupFn}>
                Submit
            </button>
        </form>
    );
};

export default SignupFrom;