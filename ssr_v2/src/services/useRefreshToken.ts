'use client'

import { useSession } from 'next-auth/react'
import UserService from './UserService'

const useRefreshToken = () => {
  const { data: session } = useSession()

  const refreshToken = async () => {
    const res = await UserService.refresh()

    if (session) session.user.accessToken = res.data.accessToken
  }

  return refreshToken
}

export default useRefreshToken
