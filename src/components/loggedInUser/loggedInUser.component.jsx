import { useFirebaseContext } from '../../utilities/firebase/context/firebase.context'

const LoggedInUser = (props) => {

    const {
        signout
    } = useFirebaseContext();

    return (
        <div>
            <button onClick={signout}>signout</button>
        </div>
    )
}

export default LoggedInUser;