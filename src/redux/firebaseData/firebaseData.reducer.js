const INITIAL_STATE = {
    synced: false
}

const firebaseDataReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case 'SET_SYNCED':{
            return {
                ...state,
                synced: action.payload
            }
        }
        default:
            return state;
    }
}

export default firebaseDataReducer;