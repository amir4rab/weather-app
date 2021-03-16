const INITIAL_STATE = {
    data: [],
}

const weatherApiReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case 'SET_NEW_CITY':{
            //** check for not adding a doplicate **//
            const newArr = state.data.filter( cityData => cityData.name !== action.payload.name );

            console.log('ruuned!');

            return {
                ...state,
                data: [
                    ...newArr,
                    {
                        name: action.payload.name,
                        positon: newArr.length === 0 ? 0 : newArr.length + 1,
                        weatherData: null,
                        GeoData: action.payload.GeoData
                    }
                ],
            }
        }
        case 'SET_CITY_WEATHER':{
            let changedCity;
            //** updating data from arr **//
            const newArr = state.data.filter( cityData => {
                if ( cityData.name !== action.payload.name ) {
                    return true
                } else {
                    changedCity = {
                        ...cityData,
                        weatherData: {
                            data: action.payload.data,
                            fetchDate: action.payload.date
                        }
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
        }
        case 'REMOVE_CITY':{
            const newArr = state.data.filter( cityData => cityData.name !== action.payload );

            return {
                ...state,
                data: [
                    ...newArr
                ],
            }
        }
        default:
            return state
    }
}

export default weatherApiReducer;