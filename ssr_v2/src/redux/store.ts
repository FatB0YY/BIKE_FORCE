import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/UserSlice'

const rootReducer = combineReducers({
  user: userReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
