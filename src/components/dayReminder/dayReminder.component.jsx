import { useState, useEffect } from 'react';

const DayReminder = ({ dateObj }) => {
    const [ state, setState ] = useState(null);

    useEffect( _ => {
        const daysArr = [ 'SunDay', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday' ];

        setState(daysArr[dateObj.getDay()]);
    },[ dateObj, setState ] )

    return (
        <p>
            { state === null ? null : state }
        </p>
    );
};

export default DayReminder;