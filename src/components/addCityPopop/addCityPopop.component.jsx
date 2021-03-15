import React from 'react';

import classes from './addCityPopop.module.scss';

const AddCityPopop = ({ setPopupStateDeactive }) => {
    const closePopup = (e) => {
        if ( e.target.id === 'overlay' ) setPopupStateDeactive();
    }

    return (
        <div id="overlay" className={ classes.overlay } onClick={ closePopup }>
            <div className={ classes.overlay_inner }>
                add city popop
            </div>
        </div>
    );
};

export default AddCityPopop;