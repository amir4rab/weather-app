import React, { useState, useEffect } from 'react';

import classes from './homePageIndicator.module.scss';

import Dot from './dot/dot.component';

const HomePageIndicator = ({ data, activeIndex, changeIndexFn }) => {
    const [ state, setState ] = useState(null);

    // console.log(data);

    useEffect( _ => {
        setState(_=>{
            const reArr = data.map( city => city.name );
            reArr.push('Add new City');
            return reArr;
        })
    }, [ setState, data ]);

    return (
        <div>
            {
                state === null ? null :
                <div className={ classes.mobile_indicator }>
                    <div className={ classes.mobile_indicator_title }>
                        { state[activeIndex] }
                    </div>
                    <div className={ classes.mobile_indicator_dots }>
                        { state.map( ( _, index ) => <Dot key={index} activeIndex={activeIndex} index={index}></Dot> ) }
                    </div>
                </div>
            }
        </div>
    );
}
export default HomePageIndicator;