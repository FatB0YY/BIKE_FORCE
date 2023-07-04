import { IAuthResponse, IPropsAuthReg, IPropsAuthLogin } from '../types/Auth'
import { rtkAPI } from './rtkAPI'

export const authAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IAuthResponse, IPropsAuthLogin>({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    registration: build.mutation<IAuthResponse, IPropsAuthReg>({
      query: (credentials) => ({
        url: '/user/registration',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['Users'],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
      }),
    }),
    checkAuth: build.query<IAuthResponse, void>({
      query: () => ({
        url: '/user/refresh',
      }),
    }),
  }),
})

export const { useLazyCheckAuthQuery, useLoginMutation, useRegistrationMutation, useLogoutMutation } = authAPI
