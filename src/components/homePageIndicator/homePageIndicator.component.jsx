import React, { useState, useEffect } from 'react';

import classes from './homePageIndicator.module.scss';

import Dot from './dot/dot.component';

const HomePageIndicator = ({ data, activeIndex, setActiveIndex }) => {
    const [ state, setState ] = useState(null);

    // console.log(setActiveIndex());

    useEffect( _ => {
        setState( _ => {
            const reArr = data.map( city => city.name );
            reArr.push('Add new City');
            return reArr;
        });
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
                        { state.map( ( city , index ) => <Dot setToThisIndex={ _ => setActiveIndex(index)} key={index} name={city} activeIndex={activeIndex} index={index}></Dot> ) }
                    </div>
                </div>
            }
        </div>
    );
}
export default HomePageIndicator;