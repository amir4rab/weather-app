import React, { useState } from 'react';

import AddCity from '../addCity/addCity.component';
import AddCityPopop from '../addCityPopop/addCityPopop.component';

const AddNewCity = props => {
    const [ popopState, setPopupState ] = useState(false);

    // console.log(popopState);

    return (
        <div>
            { popopState === true ? <AddCityPopop setPopupStateDeactive={ _ => setPopupState(false) } /> : null }
            <AddCity setPopupStateActive={ setPopupState } />
        </div>
    )
}

export default AddNewCity;