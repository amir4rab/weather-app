import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { setWeatherSynced, setCitiesArr } from '../../redux/weatherApiData/weatherApiData.actions';

import classes from './loggedInUser.module.scss';

import { useFirebaseContext } from '../../utilities/firebase/context/firebase.context';
import LoadingPopup from '../loadingPopup/loadingPopup.component';

const LoggedInUser = ({
    setWeatherSynced,
    weatherData,
    setCitiesArr,
}) => {

    const {
        signout,
        user,
        setData,
        getData,
    } = useFirebaseContext();

    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(_ => {
        setIsLoading(true);
        getData()
            .then( res => {
                const data = weatherData.data.map( cityData => ({ 
                    name: cityData.name,
                    geoData: cityData.geoData
                }));
                if ( res.weatherData === null ) {
                    if ( weatherData.data.length === 0 ) {
                        setIsLoading(false);
                    } else {
                        setData({
                            weatherData: data
                        }).then(_ => {
                            setIsLoading(false);
                            setWeatherSynced(true);
                        })
                    };
                } else if ( weatherData.data.length === 0 ) {
                    // ! set data from cloaud to redux
                    console.log('here');
                    // setCitiesArr(res.weatherData)
                    setIsLoading(false);
                    setWeatherSynced(true);
                    // console.log( res.weatherData.length, data.length )
                    } else {
                        if( res.weatherData.length !== data.length ) {
                        setIsLoading(false);
                        console.log(`option :`, 2);
                        //! chose between cloud data or local data
                    } else {
                        // const weatherDataLength = res.weatherData.length;
                        let notSame = false;
                        // console.log(weatherDataLength);
                        for( let index = 0; index < res.weatherData.length; index++ ){
                            if ( res.weatherData[index].name !== data[index].name ) {
                                notSame = true;
                                break;
                            }
                        }
                        if ( notSame ) {
                            //! chose between cloud data or local data
                        }
                    }
                    console.log(res)
                    setIsLoading(false);
                }
            })
    },[getData, setCitiesArr, setData, setWeatherSynced, weatherData.data]);

    console.log(weatherData.synced);

    return (
        <div className={ classes.main }>
            {
                isLoading ? 
                <LoadingPopup />
                :
                null
            }
            <div className={ classes.wellcome }>
                wellcome { user.displayName }
            </div>
            <div className={ classes.accountOptions }>
                <p className={ classes.accountOptions_title }>
                    Sync
                </p>
                <div className={ classes.accountOptions_btn_section }>
                    <button className={ classes.btn_red } onClick={signout}>signout</button>
                </div>
            </div>
            <div className={ classes.accountOptions }>
                <p className={ classes.accountOptions_title }>
                    Logout
                </p>
                {
                    !weatherData.synced  ?
                    <div className={ classes.accountOptions_btn_section }>
                        <button className={ classes.btn_green }>Sync</button>
                    </div>
                    :
                    <p>You are all synced with the clouds</p>
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setWeatherSynced: data => dispatch(setWeatherSynced(data)),
    setCitiesArr: data => dispatch(setCitiesArr(data))
});

const mapStateToProps = state => ({
    weatherData: state.weatherApi
})

export default  connect( mapStateToProps, mapDispatchToProps )(LoggedInUser);