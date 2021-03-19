import classes from './hourlyItem.module.scss';

const HourlyItem = ({ data }) => {
    const date = new Date(data.dt * 1000);

    console.log(date.getHours());

    return (
        <div className={ classes.item }>
            <p className={ classes.date }>
                { date.getHours() } : 00
            </p>
            <p className={ classes.temp }>
                { data.temp }°
            </p>
        </div>
    );
};

export default HourlyItem;