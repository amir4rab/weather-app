import React, { useState, useEffect } from 'react';

import classes from './homePageIndicator.module.scss';

import Dot from './dot/dot.component';

const HomePageIndicator = ({ data, acticeIndex, changeIndexFn }) => {
    const [ state, setState ] = useState(null);

    useEffect( _ => {
        setState([
                ...data,
                'Add new City',
            ])
    }, [ setState, data ]);

    console.log(`homepageindicator: ${acticeIndex}`);

    return (
        <div>
            {
                state === null ? null :
                <div className={ classes.mobile_indicator }>
                    <div className={ classes.mobile_indicator_title }>
                        { state[acticeIndex] }
                    </div>
                    <div className={ classes.mobile_indicator_dots }>
                        { state.map( ( _, index ) => <Dot key={index} activeIndex={acticeIndex} index={index}></Dot> ) }
                    </div>
                </div>
            }
        </div>
    );
}
export default HomePageIndicator;