import { useEffect, useState } from 'react';

import './loadingPopup.scss';

const LoadingPopup = ({ getDismonted, dismount }) => {
    const [ animationClasses, setAnimationClasses ] = useState([`animation`]);

    useEffect(_=>{
        setTimeout(_ => {
            setAnimationClasses(perState => ([
                ...perState,
                `sucsses`
            ]));
        }, 1000);
    },[])

    return (
        <div className={ 'animationPopupOverlay' } >
            <div className={ 'inner' } >
                <div className={ animationClasses.join(' ') }></div>
            </div>
        </div>
    );
};

export default LoadingPopup;