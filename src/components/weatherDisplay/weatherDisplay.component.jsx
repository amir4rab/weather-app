import { useEffect, useState } from 'react';
import HourlyList from './hourlyList/hourlyList.component';
import DailyList from './dailyList/dailyList.component';

import { connect } from 'react-redux';
import { setCityWeather } from '../../redux/weatherApiData/weatherApiData.actions';

import classes from './weatherDisplay.module.scss';
import WeatherImgFinder from './weatherImgFinder/weatherImgFinder';

const WeatherDisplay = ({ 
    weatherData, 
    onTouchStartFn,
    onTouchEndFn,
    onTouchMoveFn,
    setCityWeather,
    dataObj
    }) => {

    const {
        data,
        fetchedDate
    } = weatherData;

    const {
        name: cityName,
        geoData: cityGeoData
    } = dataObj;

    const [ weatherIsUpToDate, setWeatherIsUpToDate ] = useState(false);

    useEffect( _=>{
        const nowDate = new Date();
        const delta = nowDate.valueOf() - fetchedDate;
        if ( ( delta / 1000 ) > 3600 ) {
            console.log(data);
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${ cityGeoData.lat }&lon=${ cityGeoData.lon}&exclude=minutely&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
                .then( res => res.json() )
                .then( res => {
                    setWeatherIsUpToDate(true);
                    setCityWeather({
                        name: cityName,
                        data: res
                    });
                })
                .catch( err => console.log(err) );
        } else {
            setWeatherIsUpToDate(true);
        }
    },[cityGeoData, cityName, data, fetchedDate, setCityWeather])

    return (
        <div>
            {
                !weatherIsUpToDate ? 
                <div> loading </div>:
                <div className={ classes.main }>
                    <div className={ classes.hero } onTouchStart={onTouchStartFn} onTouchEnd={onTouchEndFn} onTouchMove={onTouchMoveFn}>
                        <div className={ classes.weatherData }>
                            <div className={ classes.weatherData_temp }>
                                { data.current.temp.toFixed(0) }°
                            </div>
                            <div className={ classes.weatherData_secDetails }>
                                <p className={ classes.weatherStatus }>
                                    { data.current.weather[0].description }
                                </p>
                                <p className={ classes.weatherFeels }>
                                    feels like { data.current.feels_like }°
                                </p>
                            </div>
                        </div>
                        <div className={ classes.tempIcon }>
                            <div className={ classes.tempIcon_inner }>
                                <WeatherImgFinder imgCode={ data.current.weather[0].icon } />
                            </div>
                        </div>
                    </div>
                    <div className={ classes.more }>
                        <div className={ classes.hourlyUpdates }>
                            <HourlyList dataArr={ data.hourly }/>
                        </div>
                        <div className={ classes.dailyUpdates }>
                            <DailyList dataArr={ data.daily } />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

const mapDispatchProps =  dispatch => ({
    setCityWeather: data => dispatch(setCityWeather(data))
});

export default connect( null , mapDispatchProps )(WeatherDisplay);