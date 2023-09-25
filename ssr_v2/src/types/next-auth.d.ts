import NextAuth from 'next-auth'
import { IUser } from '.'

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string
      refreshToken: string
      user: IUser
    }
  }
}
