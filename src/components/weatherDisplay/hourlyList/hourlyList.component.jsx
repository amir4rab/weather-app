import { memo } from 'react';

import classes from './hourlyList.module.scss';

import HourlyItem from './hourlyItem/hourlyItem.component';

const HourlyList = ({ dataArr }) => {
    return (
        <div className={ classes.listArr }>
            { dataArr.map( ( data, i ) => <HourlyItem data={ data } key={`hourlyItem${i}`} /> ) }
        </div>
    )
}

export default memo(HourlyList);