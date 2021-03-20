import { useEffect, useState } from 'react';

import HourlyList from './hourlyList/hourlyList.component';
import DailyList from './dailyList/dailyList.component';
import MoreDetails from './moreDetails/moreDetails.component';
import WeatherImgFinder from './weatherImgFinder/weatherImgFinder';

import { connect } from 'react-redux';
import { setCityWeather } from '../../redux/weatherApiData/weatherApiData.actions';

import OpenWeatherApi from '../../utilities/openWeatherApi/openWeatherApi'

import classes from './weatherDisplay.module.scss';

const WeatherDisplay = ({ 
    weatherData, 
    onTouchStartFn,
    onTouchEndFn,
    onTouchMoveFn,
    setCityWeather,
    dataObj,
    settings
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
            OpenWeatherApi.getWeather(
                {
                    lat: cityGeoData.lat,
                    lon: cityGeoData.lon
                },
                settings.unitSettings
            )
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
    },[cityGeoData, cityName, data, fetchedDate, setCityWeather, settings])

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
                        <div>
                            <MoreDetails data={ data.current } />
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