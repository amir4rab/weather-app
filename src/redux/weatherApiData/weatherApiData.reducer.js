const INITIAL_STATE = {
    data: [],
    synced: false
}

const weatherApiReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case 'SET_NEW_CITY':{
            //** check for not adding a doplicate **//
            const newArr = state.data.filter( cityData => cityData.name !== action.payload.name );

            console.log('ruuned!');

            return {
                ...state,
                synced: false,
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

            const dateObj = new Date();
            const dateValue = dateObj.valueOf();

            //** updating data from arr **//
            const newArr = state.data.filter( cityData => {
                if ( cityData.name !== action.payload.name ) {
                    return true
                } else {
                    changedCity = {
                        ...cityData,
                        weatherData: {
                            data: action.payload.data,
                            fetchDate: dateValue
                        }
                    }
                    return false
                }
            });

            return {
                ...state,
                synced: false,
                data: [
                    ...newArr,
                    changedCity
                ],
            }
        }
        case 'SET_NEW_CITY_FULLY':{
            //** removing Doplicates **//
            const newArr = state.data.filter( cityData => cityData.name !== action.payload.name );

            const dateObj = new Date();
            const dateValue = dateObj.valueOf();

            return {
                ...state,
                synced: false,
                data: [
                    ...newArr,
                    {
                        name: action.payload.name,
                        geoData: action.payload.geoData,
                        weatherData: {
                            data: action.payload.weatherData,
                            fetchedDate: dateValue
                        },
                        positon: newArr.length === 0 ? 0 : newArr.length + 1
                    }
                ],
            }
        }
        case 'REMOVE_CITY':{
            const newArr = state.data.filter( cityData => cityData.name !== action.payload );

            return {
                ...state,
                synced: false,
                data: [
                    ...newArr
                ],
            }
        }
        case 'SET_SYNCED':{
            return{
                ...state,
                synced: true,
            }
        }
        case 'SET_CITIES_ARR':{
            const resArr = action.payload.map( ( city, index ) =>  ({
                name: city.name,
                geoData: city.geoData,
                positon: index,
                weatherData: null,
            }));
            return {
                ...state,
                synced: true,
                data: [
                    ...resArr
                ]
            };
        }
        default:
            return state
    }
}

export default weatherApiReducer;