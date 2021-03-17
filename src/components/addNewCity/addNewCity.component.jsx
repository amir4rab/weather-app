import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux'
import { setNewCityFully } from '../../redux/weatherApiData/weatherApiData.actions';

import AddCity from '../addCity/addCity.component';
import AddCityPopop from '../addCityPopop/addCityPopop.component';

const AddNewCity = ({ setNewCityFully }) => {
    const [ popopState, setPopupState ] = useState(false);

    const setCityData = (data) => {
        setPopupState(false);
        console.log(data);
        // const dateObj = new Date();
        setNewCityFully({
            name: data.name,
            geoData: data.geoData,
            weatherData: data.weatherData
        })
    }

    return (
        <div>
            { popopState === true ? <AddCityPopop unsuccessfullProcess={ _ => setPopupState(false) } successfullProcess={setCityData} /> : null }
            <AddCity setPopupStateActive={ setPopupState } />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setNewCityFully: data => dispatch(setNewCityFully(data))
});


export default connect( null, mapDispatchToProps )( AddNewCity );