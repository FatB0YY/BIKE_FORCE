import UserService from '@/services/UserService'
import { AuthResponse } from '@/types'
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

interface RetryInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
  maxRedirects: 0,
})

const handleUnauthorizedError = async (error: AxiosError) => {
  const originalRequest: RetryInternalAxiosRequestConfig | undefined = error.config
  if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
    originalRequest._retry = true
    try {
      const response = await UserService.refresh()
      Cookies.set('token', response.data.accessToken, { expires: 7 })
      return $api(originalRequest)
    } catch (error) {
      console.log('НЕ АВТОРИЗОВАН', error)

      throw error
    }
  }
  throw error
}

// $api.interceptors.response.use((config: AxiosResponse) => config, handleUnauthorizedError)

// $api.interceptors.request.use((config) => {
//   if (!config.headers) {
//     return config
//   }

//   config.headers.Authorization = `Bearer ${Cookies.get('token')}`
//   return config
// })

export default $api
