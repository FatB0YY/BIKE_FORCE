import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appReducer } from './slices/AppSlice'
import { productsReducer } from './slices/ProductsSlice'
import { rolesReducer } from './slices/RolesSlice'
import { authReducer } from './slices/AuthSlice'
import { brandsReducer } from './slices/BrandsSlice'
import { categoriesReducer } from './slices/CategoriesSlice'
import { usersReducer } from './slices/UsersSlice'
import { rolesAPI } from '../service/RolesAPI'
import { brandsAPI } from '../service/BrandsAPI'
import { productsAPI } from '../service/ProductsAPI'
import { categoriesAPI } from '../service/CategoriesAPI'
import { authAPI } from '../service/AuthAPI'
import { rtkAPI } from '../service/rtkAPI'
import { usersAPI } from '../service/UsersAPI'

const rootReducer = combineReducers({
  auth: authReducer,
  role: rolesReducer,
  app: appReducer,
  product: productsReducer,
  brand: brandsReducer,
  category: categoriesReducer,
  user: usersReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [rolesAPI.reducerPath]: rolesAPI.reducer,
  [brandsAPI.reducerPath]: brandsAPI.reducer,
  [productsAPI.reducerPath]: productsAPI.reducer,
  [categoriesAPI.reducerPath]: categoriesAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
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
