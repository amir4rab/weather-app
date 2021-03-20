import classes from './dailyItem.module.scss';

import WeatherImgFinder from '../../weatherImgFinder/weatherImgFinder';

const DailyItem = ({ data }) => {
    const date = new Date(data.dt * 1000);

    const weekDays = [
        `Monday`,
        `Tuesday`,
        `Wednesday`,
        `Thursday`,
        `Friday`,
        `Saturday`,
        `Sunday`
    ];

    return (
        <div className={ classes.item }>
            <div className={ classes.date }>
                { weekDays[date.getDay()] }
            </div>
            <div className={ classes.weather }>
                <div className={ classes.temp }>
                    <p className={ classes.temp_min }>
                        min { data.temp.min.toFixed(0) }°
                    </p>
                    <p className={ classes.temp_max }>
                        max { data.temp.max.toFixed(0) }°
                    </p>
                </div>
                <div className={ classes.icon }>
                    <WeatherImgFinder imgCode={ data.weather[0].icon }/>
                </div>
            </div>
        </div>
    );
};

export default DailyItem;