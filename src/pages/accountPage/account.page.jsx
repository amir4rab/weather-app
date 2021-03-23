import { useState, useEffect } from 'react';

import classes from './account.module.scss';

import { useFirebaseContext } from '../../utilities/firebase/context/firebase.context';

import LoggedInUser from '../../components/loggedInUser/loggedInUser.component';
import LoggedOutUser from '../../components/loggedOutUser/loggedOutUser.component';

const AccountPage = _ => {
    // useState(null)
    const {
        user,
        loading
    } = useFirebaseContext();

    console.log(user);

    // console.log(user);

    return (
        <div className={ classes.main }>
            {
                loading ? 
                <div>
                    loading...
                </div>
                :
                <div>
                    {
                        user !== null ? 
                        <LoggedInUser />
                        :
                        <LoggedOutUser />
                    }
                </div>
            }
        </div>
    )
}

export default AccountPage;