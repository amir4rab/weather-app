import { createRef } from 'react';

import '../component.styles.scss';

const SignupFrom = ({ initSignup }) => {
    const emailInput = createRef();
    const passwordInput = createRef();

    const initSignupFn = () => {
        initSignup(
            emailInput.current.value,
            passwordInput.current.value
        );
    }

    return (
        <form className={ `main` } onSubmit={ e => e.preventDefault() }>
            <h4 className={ `title` }>
                sign up
            </h4>
            <div className={ `inputGroup` }>
                <label className={ `inputGroup_label` }>Email</label>
                <input className={ `inputGroup_input` } ref={ emailInput } type="email"/>
            </div>
            <div className={ `inputGroup` }>
                <label className={ `inputGroup_label` }>Password</label>
                <input className={ `inputGroup_input` } ref={ passwordInput } type="password"/>
            </div>
            <div className={ `inputGroup` }>
                <label className={ `inputGroup_label` }>repeat your password</label>
                <input className={ `inputGroup_input` } type="password"/>
            </div>
            <button className={`submitBtn`} onClick={initSignupFn}>
                Submit
            </button>
        </form>
    );
};

export default SignupFrom;