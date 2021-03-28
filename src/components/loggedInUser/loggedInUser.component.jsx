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
    const [ loadingEnded, setLoadingEnded ] = useState(false);

    useEffect(_ => {
        setIsLoading(true);
        getData()
            .then( res => {
                const data = weatherData.data.map( cityData => ({ 
                    name: cityData.name,
                    geoData: cityData.geoData
                }));
                if ( res === null || res.weatherData === null ) {
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

                    setIsLoading(false);
                    setWeatherSynced(true);
                    setCitiesArr(res.weatherData);

                } else {
                    console.log(res.weatherData, data);

                    if( res.weatherData.length !== data.length ) {

                        setIsLoading(false);
                        console.log(`option :`, 2);
                        //! chose between cloud data or local data

                    } else {
                        ;
                        let notSame = false;
                        
                        for( let index = 0; index < res.weatherData.length; index++ ){

                            if ( res.weatherData[index].name !== data[index].name ) {
                                notSame = true;
                                break;
                            }

                        }
                        if ( notSame ) {

                            //! chose between cloud data or local data
                        } else {

                            setWeatherSynced(true);
                        }

                    }
                    setIsLoading(false);
                }
            })
    },[getData, setCitiesArr, setData, setWeatherSynced, weatherData.data]);

    // console.log(weatherData.synced);

    const syncData = () => {
        setLoadingEnded(false);
        setIsLoading(true);
        const data = weatherData.data.map( cityData => ({ 
            name: cityData.name,
            geoData: cityData.geoData
        }));
        setData({
            weatherData: [
                ...data
            ]
        })
            .then( _ => {
                setLoadingEnded(true)
            })
            .catch( err => console.log(err) );
    }

    return (
        <div className={ classes.main }>
            {
                isLoading ? 
                <LoadingPopup getDismonted={ loadingEnded } dismount={ _ => setIsLoading(false) } />
                :
                null
            }
            <div className={ classes.wellcome }>
                wellcome { user.displayName }
            </div>
            <div className={ classes.accountOptions }>
                <p className={ classes.accountOptions_title }>
                    Logout
                </p>
                <div className={ classes.accountOptions_btn_section }>
                    <button className={ classes.btn_red } onClick={signout}>signout</button>
                </div>
            </div>
            <div className={ classes.accountOptions }>
                <p className={ classes.accountOptions_title }>
                    Sync
                </p>
                {
                    !weatherData.synced  ?
                    <div className={ classes.accountOptions_btn_section }>
                        <button 
                            className={ classes.btn_green }
                            onClick= { syncData }
                        >Sync</button>
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