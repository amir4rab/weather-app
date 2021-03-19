import { memo } from 'react';
import HourlyList from './hourlyList/hourlyList.component';
import DailyList from './dailyList/dailyList.component';

import classes from './weatherDisplay.module.scss';
import WeatherImgFinder from './weatherImgFinder/weatherImgFinder';

const WeatherDisplay = ({ 
    data, 
    onTouchStartFn,
    onTouchEndFn,
    onTouchMoveFn, 
    }) => {

    return (
        <div className={ classes.main }>
            <div className={ classes.hero } onTouchStart={onTouchStartFn} onTouchEnd={onTouchEndFn} onTouchMove={onTouchMoveFn}>
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
            <div className={ classes.more }>
                <div className={ classes.hourlyUpdates }>
                    <HourlyList dataArr={ data.hourly }/>
                </div>
                <div className={ classes.dailyUpdates }>
                    <DailyList dataArr={ data.daily } />
                </div>
            </div>
        </div>
    );
}

export default memo(WeatherDisplay);