import { combineReducers } from 'redux';

import weatherApiReducer from './weatherApiData/weatherApiData.reducer';
import firebaseDataReducer from './firebaseData/firebaseData.reducer';

export default combineReducers({
    weatherApi: weatherApiReducer,
    firebase: firebaseDataReducer
});