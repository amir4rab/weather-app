import React, { useState } from 'react';

import { connect } from 'react-redux'
import { setNewCityFully } from '../../redux/weatherApiData/weatherApiData.actions';

import AddCity from '../addCity/addCity.component';
import AddCityPopop from '../addCityPopop/addCityPopop.component';

const AddNewCity = ({ 
    setNewCityFully,
    onTouchStartFn,
    onTouchEndFn,
    onTouchMoveFn,
}) => {
    const [ popopState, setPopupState ] = useState(false);

    
    const setCityData = (data) => {
        // console.log(data.geoData, data);
        setPopupState(false);
        // console.log(data);
        // const dateObj = new Date();
        setNewCityFully({
            name: data.name,
            geoData: data.geoData,
            weatherData: data.weatherData
        })
    }

    return (
        <div onTouchStart={ onTouchStartFn } onTouchEnd={ onTouchEndFn } onTouchMove={ onTouchMoveFn } >
            { popopState === true ? <AddCityPopop unsuccessfullProcess={ _ => setPopupState(false) } successfullProcess={setCityData} /> : null }
            <AddCity setPopupStateActive={ setPopupState } />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setNewCityFully: data => dispatch(setNewCityFully(data))
});


export default connect( null, mapDispatchToProps )( AddNewCity );