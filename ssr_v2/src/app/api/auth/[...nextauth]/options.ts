import type { NextAuthOptions } from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import UserService from '@/services/UserService'
import { AuthResponse, IErrorResponseAuth } from '@/types'

import { User } from 'next-auth' // Импортируйте тип User из next-auth

export const authConfig: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: '', // данные из google cloud,
    //   clientSecret: '', // данные из google cloud, вставляем в env
    // }),
    // форма авторизации некста
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },

      /* eslint @typescript-eslint/no-empty-interface: "off" */
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null
        const authResponse = await UserService.login(credentials.email, credentials.password)

        if ('accessToken' in authResponse.data && 'refreshToken' in authResponse.data) {
          const data = authResponse.data as AuthResponse

          if (data.user && data.user.email === credentials.email) {
            // Сохраните токены в куках (наверно)
            console.log('req', req)

            return {
              id: '',
              ...data,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            }
          }
        } else if ('message' in authResponse.data && Array.isArray(authResponse.data.errors)) {
          const data = authResponse.data as IErrorResponseAuth

          throw new Error(JSON.stringify(data))
        }
        return null
      },
    }),
  ],
  secret: '4TaSqnS8Udm6KZRqssScE5dED3ZQBlp7',
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.log('token', token)
      // console.log('user', user)

      if (trigger === 'update') {
        return { ...token, ...session.user }
      }

      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      // console.log('session', session)
      // console.log('token', token)
      // console.log('user', user)

      session.user = token as any // необходимо
      return session
    },
  },
}
