import NextAuth from 'next-auth'
import { IUser } from './index'

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string
      accessToken: string
      refreshToken: string
      user: IUser
    }
  }
}
