import { useState } from 'react';

import { connect } from 'react-redux';
import { setSettingsSynced } from '../../redux/settingsData/settingsData.actions';
import { setWeatherSynced } from '../../redux/weatherApiData/weatherApiData.actions';

import classes from './loggedInUser.module.scss';

import { useFirebaseContext } from '../../utilities/firebase/context/firebase.context';
import LoadingPopup from '../loadingPopup/loadingPopup.component';

const LoggedInUser = ({
    setWeatherSynced,
    setSettingsSynced,
    weatherSynced,
    settingsSynced,
}) => {

    const {
        signout,
        user
    } = useFirebaseContext();

    const [ isLoading, setIsLoading ] = useState(false);

    console.log( weatherSynced, settingsSynced );
    console.log('runned!');

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
                    !weatherSynced || !settingsSynced ?
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
    setSettingsSynced: data => dispatch(setSettingsSynced(data))
});

const mapStateToProps = state => ({
    weatherSynced: state.weatherApi.synced,
    settingsSynced: state.settings.synced
})

export default  connect( mapStateToProps,mapDispatchToProps )(LoggedInUser);