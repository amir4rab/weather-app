import { useState, useEffect } from 'react';

import classes from './homePageIndicator.module.scss';
import React from 'react';

const HomePageIndicator = ({ data, acticeIndex, changeIndexFn }) => {
    const [ state, setState ] = useState(null)

    useEffect( _ => {
        setState([
                ...data,
                'Add new City'
            ])
    }, [ setState, data ])

    return (
        <div>
            {
                state === null ? null :
                <div className={ classes.mobile_indicator }>
                    <div className={ classes.mobile_indicator_title }>
                        { state[acticeIndex] }
                    </div>
                    <div className={ classes.mobile_indicator_dots }>
                        { state.map( ( _, index ) => <div className={ acticeIndex === index ? 'dot_active' : 'dot' } key={index}></div> ) }
                    </div>
                </div>
            }
        </div>
    );
}
export default HomePageIndicator;