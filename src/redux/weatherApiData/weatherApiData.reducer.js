const INITIAL_STATE = {
    data: [],
}

const weatherApiReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case 'SET_NEW_CITY':{
            //** check for not adding a doplicate **//
            const newArr = state.data.filter( cityData => cityData.name !== action.payload.name );

            return {
                ...state,
                data: [
                    ...newArr,
                    {
                        name: action.payload.name,
                        positon: newArr.length === 0 ? 0 : newArr.length + 1,
                        weatherData: null,
                        GeoData: null
                    }
                ],
            }
        };
        case 'SET_CITY_WEATHER':{
            let changedCity;
            //** updating data from arr **//
            const newArr = state.data.filter( cityData => {
                if ( cityData.name !== action.payload.name ) {
                    return true
                } else {
                    changedCity = {
                        ...cityData,
                        weatherData: action.payload.data
                    }
                    return false
                }
            });

            return {
                ...state,
                data: [
                    ...newArr,
                    changedCity
                ],
            }
        };
        case 'SET_CITY_GEO':{
            let changedCity;
            const newArr = state.data.filter( cityData => {
                if ( cityData.name !== action.payload.name ) {
                    return true
                } else {
                    changedCity = {
                        ...cityData,
                        GeoData: action.payload.data
                    }
                    return false
                }
            });

            return {
                ...state,
                data: [
                    ...newArr,
                    changedCity
                ],
            }
        };
        case 'REMOVE_CITY':{
            const newArr = state.data.filter( cityData => cityData.name !== action.payload );

            return {
                ...state,
                data: [
                    ...newArr
                ],
            }
        };
        default:
            return state
    }
}

export default weatherApiReducer;