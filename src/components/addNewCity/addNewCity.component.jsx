import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux'
import { setNewCity, setCityWeather } from '../../redux/weatherApiData/weatherApiData.actions';

import AddCity from '../addCity/addCity.component';
import AddCityPopop from '../addCityPopop/addCityPopop.component';

const AddNewCity = ({ setNewCity, setCityWeather }) => {
    const [ popopState, setPopupState ] = useState(false);

    const setCityData = (data) => {
        setPopupState(false);
        console.log(data);
    }

    return (
        <div>
            { popopState === true ? <AddCityPopop unsuccessfullProcess={ _ => setPopupState(false) } successfullProcess={setCityData} /> : null }
            <AddCity setPopupStateActive={ setPopupState } />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setNewCity: data => dispatch(setNewCity(data)),
    setCityWeather: data => dispatch(setCityWeather(data)),
});


export default connect( null, mapDispatchToProps )( AddNewCity );