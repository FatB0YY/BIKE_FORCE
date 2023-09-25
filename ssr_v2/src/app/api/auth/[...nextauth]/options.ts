import type { NextAuthOptions } from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import UserService from '@/services/UserService'

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
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null

        const authResponse: any = await UserService.login(credentials.email, credentials.password)

        if (authResponse.errors.length > 0 && authResponse.message) {
          throw new Error(JSON.stringify(authResponse))
        }

        if (authResponse.user && authResponse.user.email === credentials.email) {
          // Сохраните токены в куках
          console.log('req', req)

          // Верните объект, который будет сохранен в сессии пользователя
          const user = authResponse.user
          return {
            ...user,
            accessToken: authResponse.accessToken,
            refreshToken: authResponse.refreshToken,
          }
        }

        return null
      },
    }),
  ],
  secret: '4TaSqnS8Udm6KZRqssScE5dED3ZQBlp7',
  pages: {
    signIn: '/signin',
    signOut: '/signout',

    // signIn: '/auth/signin',
  },
  callbacks: {
    // async signIn(signInData) {
    //   console.log('signInData', signInData)

    //   return true
    // },
    // async redirect(redirectData) {
    //   console.log('redirectData', redirectData)

    //   return redirectData.baseUrl
    // },

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
