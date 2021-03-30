import { useEffect, useState, useCallback } from 'react';

import HourlyList from './hourlyList/hourlyList.component';
import DailyList from './dailyList/dailyList.component';
import MoreDetails from './moreDetails/moreDetails.component';
import WeatherImgFinder from './weatherImgFinder/weatherImgFinder';

import { connect } from 'react-redux';
import { setCityWeather } from '../../redux/weatherApiData/weatherApiData.actions';

import OpenWeatherApi from '../../utilities/openWeatherApi/openWeatherApi'

import classes from './weatherDisplay.module.scss';
import LoadingPopup from '../loadingPopup/loadingPopup.component';

const WeatherDisplay = ({ 
    onTouchStartFn,
    onTouchEndFn,
    onTouchMoveFn,
    setCityWeather,
    dataObj,
    settings
    }) => {
    // console.log(dataObj);

    const {
        name: cityName,
        geoData,
        weatherData
    } = dataObj;

    const [ weatherIsUpToDate, setWeatherIsUpToDate ] = useState(weatherData);

    const fetchWeatherData = useCallback( _ => {
        // console.log(`getting data!`)
        OpenWeatherApi.getWeather(
            {
                lat: geoData.lat,
                lon: geoData.lon
            },
            settings.unitSettings
        )
            .then( res => {
                // console.log(res);
                setCityWeather({
                    name: cityName,
                    data: res
                })
            })
            .catch( err => console.log(err) );
    },[cityName, geoData.lat, geoData.lon, setCityWeather, settings.unitSettings]);

    useEffect( _ =>{
        if( weatherData === null ) {
            fetchWeatherData();
            return;
        }
        const nowDate = new Date();
        const delta = nowDate.valueOf() - weatherData.fetchedDate;
        if ( ( delta / 1000 ) > 3600 ) {
            fetchWeatherData();
        } else {
            setWeatherIsUpToDate(true);
        }
    },[ weatherData, fetchWeatherData ])


    return (
        <div>
            {
                !weatherIsUpToDate || dataObj.weatherData === null ? 
                <LoadingPopup />
                :
                <div className={ classes.main }>
                    <div className={ classes.hero } onTouchStart={onTouchStartFn} onTouchEnd={onTouchEndFn} onTouchMove={onTouchMoveFn}>
                        <div className={ classes.weatherData }>
                            <div className={ classes.weatherData_temp }>
                                { weatherData.data.current.temp.toFixed(0) }°
                            </div>
                            <div className={ classes.weatherData_secDetails }>
                                <p className={ classes.weatherStatus }>
                                    { weatherData.data.current.weather[0].description }
                                </p>
                                <p className={ classes.weatherFeels }>
                                    feels like { weatherData.data.current.feels_like }°
                                </p>
                            </div>
                        </div>
                        <div className={ classes.tempIcon }>
                            <div className={ classes.tempIcon_inner }>
                                <WeatherImgFinder imgCode={ weatherData.data.current.weather[0].icon } />
                            </div>
                        </div>
                    </div>
                    <div className={ classes.more }>
                        <div className={ classes.hourlyUpdates }>
                            <HourlyList dataArr={ weatherData.data.hourly }/>
                        </div>
                        <div className={ classes.dailyUpdates }>
                            <DailyList dataArr={ weatherData.data.daily } />
                        </div>
                        <div>
                            <MoreDetails data={ weatherData.data.current } />
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

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect( mapStateToProps , mapDispatchProps )(WeatherDisplay);