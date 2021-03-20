import { memo } from 'react';

import classes from './moreDetails.module.scss';

const MoreDetails = ({ data }) => {

    const sunriseDate = new Date( data.sunrise * 1000 );
    const sunsetDate = new Date( data.sunset * 1000 )

    return (
        <div className = { classes.main }>
            <div className={ classes.details }>
                <p className={ classes.details_title }>Sunrise</p>
                <p className={ classes.details_p }>{sunriseDate.getHours()}:{sunriseDate.getMinutes()}</p>
            </div>
            <div className={ classes.details }>
                <p className={ classes.details_title }>Sunset</p>
                <p className={ classes.details_p }>{sunsetDate.getHours()}:{sunsetDate.getMinutes()}</p>
            </div>
            <div className={ classes.details }>
                <p className={ classes.details_title }>Pressure</p>
                <p className={ classes.details_p }>{data.pressure} hPa</p>
            </div>
            <div className={ classes.details }>
                <p className={ classes.details_title }>Wind speed</p>
                <p className={ classes.details_p }>{data.wind_speed} Km/H</p>
            </div>
        </div>
    );
};

export default memo(MoreDetails);