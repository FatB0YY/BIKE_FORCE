import { createStore } from 'redux'
import reducer from '../reduser/index'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['boolPage', 'roles'] ,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
export default store
