class OpenWeatherApi {
    static getWeather = ( geoData, units ) => {
        return new Promise(( resolve, reject ) => {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoData.lat}&lon=${geoData.lon}&exclude=minutely&units=${units}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
            .then( res => res.json() )
            .then( res => resolve(res) )
            .catch( err => reject(err) );
        });
    }

    static getGeoLocation = (cityName) => {
        return new Promise(( resolve, reject ) => {
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
                .then( res => res.json() )
                .then( res => resolve(res))
                .catch( err => reject(err) );
        });
    }
}

export default OpenWeatherApi;