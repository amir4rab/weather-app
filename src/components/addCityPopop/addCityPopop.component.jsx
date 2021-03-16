import React, { useState, useEffect } from 'react';

import classes from './addCityPopop.module.scss';

const AddCityPopop = ({ setPopupStateDeactive }) => {
    const [ loadingState, setLoadingState ] = useState(false);
    const [ cityNotFoundState, setCityNotFoundState ] = useState(false);
    const [ cityName, setCityName ] = useState('')

    const closePopup = (e) => {
        if ( e.target.id === 'overlay' ) setPopupStateDeactive();
    }

    // console.log(process.env.REACT_APP_OPENWEATHERMAP_API_KEY);

    const checkWithApi = () => {
        setLoadingState(true);
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
            .then( res => res.json() )
            .then( res => console.log(res[0]) )
            .catch( err => console.log(err) );
    }

    return (
        <div id="overlay" className={ classes.overlay } onClick={ closePopup }>
            <div className={ classes.overlay_inner }>
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
            </div>
        </div>
    ); 
};

export default AddCityPopop;