import React, { useState } from 'react';

import { connect } from 'react-redux';

import classes from './addCityPopop.module.scss';
import OpenWeatherApi from '../../utilities/openWeatherApi/openWeatherApi';

const AddCityPopop = ({ unsuccessfullProcess, successfullProcess, settings }) => {
    const [ loadingState, setLoadingState ] = useState(false);
    const [ cityNotFoundState, setCityNotFoundState ] = useState(false);
    const [ cityFoundState, setCityFoundState ] = useState(false);
    const [ cityName, setCityName ] = useState('');
    const [ cashedData, setCashedData ] = useState('');
    const [ cashedCountryCode, setCashedCountryCode ] = useState(null);

    const closePopup = (e) => {
        if ( e.target.id === 'overlay' ) unsuccessfullProcess();
    }

    const checkWithApi = () => {
        setLoadingState(true);
        if ( cityFoundState === false ) {
            OpenWeatherApi.getGeoLocation(cityName)
                .then( res => {
                    if( res.length > 0 ) {
                        // console.log(res[0], res[0].lat)
                        setCityFoundState(true);
                        setCashedCountryCode(res[0].country);
                        setCashedData(oldState => 
                            ({
                                ...oldState,
                                name: res[0].name.toLowerCase(),
                                geoData: {
                                    lat: res[0].lat,
                                    lon: res[0].lon
                                }
                            })
                        );
                    } else {
                        setCityNotFoundState(true);
                    }
                    setLoadingState(false);
                })
                .catch( err => console.log(err) );
        } else {
            OpenWeatherApi.getWeather(
                {
                    lat: cashedData.geoData.lat,
                    lon: cashedData.geoData.lon
                },
                settings.unitSettings
            )
                .then( res => {
                    // console.log(res)
                    setCityFoundState(true);
                    successfullProcess({
                        ...cashedData,
                        weatherData: res
                    });
                })
                .catch( err => console.log(err) );
        }
    }

    return (
        <div id="overlay" className={ classes.overlay } onClick={ closePopup }>
            <div className={ classes.overlay_inner }>
                {
                    loadingState ?
                    <div className={ classes.addCity }>
                        <div className={ classes.loading }>

                        </div>
                    </div>
                    :
                    null
                }
                {
                    !loadingState && !cityFoundState ?
                    <div className={ classes.addCity }>
                        <div className={ classes.addCity_title }>
                            Enter city name
                        </div>
                        <input className={ classes.addCity_input } value={cityName} onChange={ e => setCityName( _ => e.target.value ) } placeholder='city name' />
                        <p className={ classes.err }>
                            { cityNotFoundState === true ? `we couldn't found city by that name :( `: null }
                        </p>
                        <div className={ classes.addCity_options }>
                            <button disabled={loadingState} onClick={checkWithApi} className={ classes.greenBtn }>Check</button>
                        </div>
                    </div>
                    :
                    null
                }
                {
                    !loadingState && cityFoundState ?
                    <div className={ classes.addCity }>
                        <div className={ classes.addCity_title }>
                            Is this correct?
                        </div>
                        <div className={ classes.addCity_res }>
                            { cashedData.name }, { cashedCountryCode }
                        </div>
                        <div className={ classes.addCity_options }>
                            <button disabled={ loadingState } onClick={ unsuccessfullProcess } className={ classes.redBtn }>No</button>
                            <button disabled={ loadingState } onClick={ checkWithApi } className={ classes.greenBtn }>Yes</button>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    ); 
};

const mapStateToProps = state => ({
    settings: state.settings
})

export default connect( mapStateToProps, null )(AddCityPopop);