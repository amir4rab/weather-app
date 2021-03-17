import { memo } from 'react';

import classes from './weatherDisplay.module.scss';
import WeatherImgFinder from './weatherImgFinder/weatherImgFinder';

const WeatherDisplay = ({ data }) => {

    // console.log(props.data);

    // console.log(data);

    return (
        <div className={ classes.main }>
            <div className={ classes.hero }>
                <div className={ classes.weatherData }>
                    <div className={ classes.weatherData_temp }>
                        { data.current.temp }°
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
        </div>
    );
}

export default memo(WeatherDisplay);