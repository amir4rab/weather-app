import { useEffect, useState } from 'react';

import './loadingPopup.scss';

const LoadingPopup = ({ getDismonted, dismount }) => {
    const [ animationClasses, setAnimationClasses ] = useState([`animation`]);

    useEffect(_=>{
        if( getDismonted ) {
            setAnimationClasses(perState => ([
                ...perState,
                `sucsses`
            ]));
            setTimeout(_ => {
                dismount();
            }, 1000);
        }
    },[dismount, getDismonted])

    return (
        <div className={ 'animationPopupOverlay' } >
            <div className={ 'inner' } >
                <div className={ animationClasses.join(' ') }></div>
            </div>
        </div>
    );
};

export default LoadingPopup;