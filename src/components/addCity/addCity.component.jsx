import React from 'react';
import classes from './addCity.module.scss';

import addIcon from '../../assets/icons/addIcon.svg';

const AddCity = ({ setPopupStateActive }) => {

    return (
        <div className={ classes.main }>
            <img onClick={_ => setPopupStateActive(true) } className={ classes.img } src={addIcon} alt=""/>
            <p className={ classes.p }>Add new City</p>
        </div>
    );
};

export default AddCity;