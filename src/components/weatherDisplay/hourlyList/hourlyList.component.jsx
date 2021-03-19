import { memo } from 'react';

import classes from './hourlyList.module.scss';

import HourlyItem from './hourlyItem/hourlyItem.component';

const HourlyList = ({ dataArr }) => {
    return (
        <div className={ classes.listArr }>
            { dataArr.map( data => <HourlyItem data={ data } /> ) }
        </div>
    )
}

export default memo(HourlyList);