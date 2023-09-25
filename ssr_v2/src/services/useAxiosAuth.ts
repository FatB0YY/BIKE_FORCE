'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import $api from './axios'
import { InternalAxiosRequestConfig } from 'axios'
import useRefreshToken from './useRefreshToken'

const useAxiosAuth = () => {
  const { data: session } = useSession()
  const refreshToken = useRefreshToken()

  useEffect(() => {
    const reqIntercept = $api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (!config.headers) {
          return config
        }

        config.headers.Authorization = `Bearer ${session?.user.accessToken}`

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    const resIntercept = $api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error.config

        if (error.response.status === 401 && !prevReq.sent) {
          prevReq.sent = true

          await refreshToken()
          prevReq.headers['Authorization'] = `Bearer ${session?.user.accessToken}`
          return $api(prevReq)
        }

        return Promise.reject(error)
      },
    )

    return () => {
      $api.interceptors.request.eject(reqIntercept)
      $api.interceptors.response.eject(resIntercept)
    }
  }, [session])

  return $api
}

export default useAxiosAuth
