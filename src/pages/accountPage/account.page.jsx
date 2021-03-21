import { useState } from 'react';

import classes from './account.module.scss';

import LoggedInUser from '../../components/loggedInUser/loggedInUser.component';
import LoggedOutUser from '../../components/loggedOutUser/loggedOutUser.component';

const AccountPage = (props) => {
    const [ userState, setUserState ] = useState(false);

    return (
        <div className={ classes.main }>
            {
                userState ? 
                <LoggedInUser />
                :
                <LoggedOutUser />
            }
        </div>
    )
}

export default AccountPage;