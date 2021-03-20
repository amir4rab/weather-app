const INITIAL_STATE = {
    signIn: false,
    unitSettings: 'metric'
}

const settingsDataReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case 'SET_UNIT_SETTINGS': {
            return {
                ...state,
                unitSettings: action.payload
            }
        }
        case 'SET_SIGN_IN': {
            return {
                ...state,
                signIn: action.payload
            }
        }
        default:
            return state;
    }
}

export default settingsDataReducer;