import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { setWeatherSynced, setCitiesArr, weatherClear } from '../../redux/weatherApiData/weatherApiData.actions';
import { setSynced as setFirebaseSynced, firebaseClear } from '../../redux/firebaseData/firebaseData.actions';

import classes from './loggedInUser.module.scss';

import { useFirebaseContext } from '../../utilities/firebase/context/firebase.context';
import LoadingPopup from '../loadingPopup/loadingPopup.component';
import ShowPopup from './showPopup/showPopup.component';

const LoggedInUser = ({
    setWeatherSynced,
    weatherData,
    setCitiesArr,
    firebaseSynced,
    setFirebaseSynced,
    firebaseClear,
    weatherClear
}) => {

    const {
        signout,
        // user,
        setData,
        getData,
        getCurrUser : user
    } = useFirebaseContext();

    const [ isLoading, setIsLoading ] = useState(false);
    const [ loadingEnded, setLoadingEnded ] = useState(false);
    const [ choseData, setChoseData ] = useState(false);
    const [ cashedData, setCashedData ] = useState([]);

    const dataChoser = (input) => {
        // console.log(cashedData)
        if ( input ) {
            setCitiesArr(cashedData);
            setCashedData({});
            setChoseData(false);
        } else {
            syncData()
                .then(_ => {
                    setChoseData(false);
                });
        }
    }

    const setCashedDataFn = ( firebaseData ) => {
        setCashedData(_ => ([ ...firebaseData ]));
        setChoseData(true);
    }

    useEffect( _ => {
        if ( weatherData.synced ) return;
        if ( firebaseSynced ) return;
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
                        setFirebaseSynced(true);
                    } else {
                        setData({
                            weatherData: data
                        }).then(_ => {
                            setIsLoading(false);
                            setWeatherSynced(true);
                            setFirebaseSynced(true);
                        })
                    };
                } else if ( weatherData.data.length === 0 ) {

                    setIsLoading(false);
                    setWeatherSynced(true);
                    setCitiesArr(res.weatherData);
                    setFirebaseSynced(true);

                } else {

                    if( res.weatherData.length !== data.length ) {

                        setIsLoading(false);
                        setCashedDataFn(res.weatherData);
                        setFirebaseSynced(true);

                    } else {
                        let notSame = false;
                        
                        for( let index = 0; index < res.weatherData.length; index++ ){

                            if ( res.weatherData[index].name !== data[index].name ) {
                                notSame = true;
                                break;
                            }

                        }
                        if ( notSame ) {
                            setCashedDataFn(res.weatherData);
                            setFirebaseSynced(true);
                        } else {

                            setWeatherSynced(true);
                            setFirebaseSynced(true);
                        }

                    }
                    setIsLoading(false);
                }
            })
    },[firebaseSynced, getData, setCitiesArr, setData, setFirebaseSynced, setWeatherSynced, weatherData.data, weatherData.synced]);


    const syncData = () => {
        setLoadingEnded(false);
        setIsLoading(true);
        const data = weatherData.data.map( cityData => ({ 
            name: cityData.name,
            geoData: cityData.geoData
        }));
        return new Promise(( resolve, reject ) => {
            setData({
                weatherData: [
                    ...data
                ]
            })
                .then( _ => {
                    setLoadingEnded(true);
                    setWeatherSynced(true);
                    resolve(null);
                })
                .catch( err => {
                    console.log(err);
                    reject(null);
                });
        })
    }

    const signoutFn = () => {
        signout()
            .then( _ => {
                firebaseClear();
                weatherClear();
            });
    }

    return (
        <div className={ classes.main }>
            {
                choseData ?
                <ShowPopup fromCloud={ _ => dataChoser(true) } fromDevice={ _ => dataChoser(false) } />
                :
                null
            }
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
                    <button className={ classes.btn_red } onClick={ signoutFn }>signout</button>
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
    setCitiesArr: data => dispatch(setCitiesArr(data)),
    setFirebaseSynced: data => dispatch(setFirebaseSynced(data)),
    firebaseClear: _ => dispatch(firebaseClear()),
    weatherClear: _ => dispatch(weatherClear()),
    clearAll: _ => dispatch(_ => {
        firebaseClear();
        weatherClear();
    })
});

const mapStateToProps = state => ({
    weatherData: state.weatherApi,
    firebaseSynced: state.firebase.synced
})

export default  connect( mapStateToProps, mapDispatchToProps )(LoggedInUser);