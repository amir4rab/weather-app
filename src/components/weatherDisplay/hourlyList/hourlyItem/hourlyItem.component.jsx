import classes from './hourlyItem.module.scss';

const HourlyItem = ({ data }) => {
    const date = new Date(data.dt * 1000);
    return (
        <div className={ classes.item }>
            <p className={ classes.date }>
                { date.getHours() } : 00
            </p>
            <p className={ classes.temp }>
                { data.temp.toFixed(0) }°
            </p>
        </div>
    );
};

export default HourlyItem;