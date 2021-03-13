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