const INITIAL_STATE = {
    synced: false,
    logedin: false,
    loading: false,
    userData: null,
}

const firebaseDataReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case 'LOGIN':
            return {
                ...state,
                logedin: true,
                userData: action.payload
            }

        case 'LOGOUT':
            return {
                ...state,
                logedin: false,
                userData: null
            }

        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            }

        case 'SET_SYNCED':
            return {
                ...state,
                synced: action.payload
            }

        default:
            return state;
    }
}

export default firebaseDataReducer;