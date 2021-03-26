import classes from './account.module.scss';

import { useFirebaseContext } from '../../utilities/firebase/context/firebase.context';

import LoggedInUser from '../../components/loggedInUser/loggedInUser.component';
import LoggedOutUser from '../../components/loggedOutUser/loggedOutUser.component';
import LoadingPopup from '../../components/loadingPopup/loadingPopup.component';

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
                    <LoadingPopup />
                </div>
                :
                <div>
                    <div className={ classes.title }>
                        Account
                    </div>
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