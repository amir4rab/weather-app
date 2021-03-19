const INITIAL_STATE = {
    signIn: false,
    unitSettings: 'metric'
}

const settingsDataReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case 'SET_UNIT_SETTINGS': {
            return {
                ...state,
                unitSettings: action.payload.data
            }
        }
        default:
            return state;
    }
}

export default settingsDataReducer;