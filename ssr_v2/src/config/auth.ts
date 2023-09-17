import type { AuthOptions, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import UserService from '@/services/UserService'

export const authConfig: AuthOptions = {
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

        const authResponse = await UserService.login(credentials.email, credentials.password)

        if (authResponse.user && authResponse.user.email === credentials.email) {
          return authResponse as unknown as User
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
}
