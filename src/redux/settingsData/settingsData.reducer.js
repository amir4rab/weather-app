const INITIAL_STATE = {
    unitSettings: 'metric',
    synced: false,
}

const settingsDataReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case 'SET_UNIT_SETTINGS': {
            return {
                ...state,
                unitSettings: action.payload
            }
        }
        case 'SET_SYNCED': {
            return {
                ...state,
                synced: action.payload
            }
        }
        
        default:
            return state;
    }
}

export default settingsDataReducer;