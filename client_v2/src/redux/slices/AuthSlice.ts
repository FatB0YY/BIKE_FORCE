import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types/User'
import { IAuthResponse } from '../../types/Auth'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { RootState } from '../store'
import { authAPI } from '../../service/AuthAPI'

interface UserState {
  user: IUser | null
}

const initialState: UserState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthResponse>) => {
      state.user = action.payload.user
    },
    logOut: () => initialState,
  },
  extraReducers: (builder) => {
    // Fulfilled
    builder.addMatcher(authAPI.endpoints.login.matchFulfilled, (state, action) => {
      Cookies.set('accessToken', action.payload.accessToken, { expires: 7 })
      state.user = action.payload.user
    })
    builder.addMatcher(authAPI.endpoints.registration.matchFulfilled, (state, action) => {
      Cookies.set('accessToken', action.payload.accessToken, { expires: 7 })
      state.user = action.payload.user
    })
    builder.addMatcher(authAPI.endpoints.logout.matchFulfilled, (state, action) => {
      Cookies.remove('accessToken')
      state.user = null
    })
    builder.addMatcher(authAPI.endpoints.checkAuth.matchFulfilled, (state, action) => {
      Cookies.set('accessToken', action.payload.accessToken, { expires: 7 })
      state.user = action.payload.user
    })
    // Rejected
    builder.addMatcher(authAPI.endpoints.login.matchRejected, (state, action: any) => {
      if (action.payload.data.errors.length > 0) {
        action.payload.data.errors.forEach((error: { message: string }) => {
          toast.error(error.message)
        })
      } else {
        toast.error(action.payload?.data.message)
      }
      state.user = null
    })
    builder.addMatcher(authAPI.endpoints.registration.matchRejected, (state, action: any) => {
      if (action.payload.data.errors.length > 0) {
        action.payload.data.errors.forEach((error: { message: string }) => {
          toast.error(error.message)
        })
      } else {
        toast.error(action.payload?.data.message)
      }
      state.user = null
    })
  },
})

export default authSlice.reducer
export const { setUser, logOut } = authSlice.actions
export const selectCurrentUser = (state: RootState) => state.auth.user
