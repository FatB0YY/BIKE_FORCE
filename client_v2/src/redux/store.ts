import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import userReducer from './reducers/UserSlice'
// import filesReducer from './reducers/FilesSlice'
// import uploadReducer from './reducers/UploadSlice'
// import { filesAPI } from '../service/FilesAPI'
// import { userAPI } from '../service/UserAPI'
import { rtkAPI } from '../service/rtkAPI'

const rootReducer = combineReducers({
  //   userReducer,
  //   filesReducer,
  //   uploadReducer,
  //   [filesAPI.reducerPath]: filesAPI.reducer,
  //   [userAPI.reducerPath]: userAPI.reducer,
  [rtkAPI.reducerPath]: rtkAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkAPI.middleware),
    devTools: true,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
