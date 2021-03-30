export const setNewCity = data => ({
    type: 'SET_NEW_CITY',
    payload: data
});
export const setCityWeather = data => ({
    type: 'SET_CITY_WEATHER',
    payload: data
});
export const setCityGeo = data => ({
    type: 'SET_CITY_GEO',
    payload: data
});
export const removeCity = data => ({
    type: 'REMOVE_CITY',
    payload: data
});
export const setNewCityFully = data => ({
    type: 'SET_NEW_CITY_FULLY',
    payload: data
});
export const setWeatherSynced = data => ({
    type: 'SET_SYNCED',
    payload: data
});
export const setCitiesArr = data => ({
    type: 'SET_CITIES_ARR',
    payload: data
});
export const weatherClear = _ => ({
    type: 'CLEAR'
});