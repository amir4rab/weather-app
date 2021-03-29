import { createStore } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
// import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import rootReducer from './root-reducer';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer( persistConfig, rootReducer );

export const store = createStore( persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

export const persistor = persistStore(store);

// export default { store ,persistor };