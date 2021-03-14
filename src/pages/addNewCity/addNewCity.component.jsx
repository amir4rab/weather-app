import React, { useState } from 'react';

import AddCity from '../../components/addCity/addCity.component';
import AddCityPopop from '../../components/addCityPopop/addCityPopop.component';

const AddNewCity = props => {
    const [ popopState, setPopupState ] = useState(false);

    return (
        <div>
            { popopState === true ? <AddCityPopop setPopupStateDeactive={ _ => setPopupState(true) } /> : null }
            <AddCity setPopupStateActive={ _ => setPopupState(true) } />
        </div>
    )
}

export default AddNewCity;