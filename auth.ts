import { appConfig } from '@/config'
import axios from 'axios'
import NextAuth, { AuthOptions, DefaultSession } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import CredentialProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      accessToken: string
      sub: string
    } & DefaultSession['user']
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async credentials => {
        try {
          const { data } = await axios.post(
            appConfig.apiUrl + '/auth/login',
            credentials
          )
          if (data) {
            const { data: user } = await axios.get(
              appConfig.apiUrl + '/auth/profile',
              { headers: { Authorization: `Bearer ${data.accessToken}` } }
            )
            if (user) {
              return {
                id: user.id,
                name: user.username,
                email: user.username,
                token: data.accessToken
              }
            }
          }
          return null
        } catch (e: any) {
          throw new Error(e.response.data.message)
        }
      }
    })
  ],
  callbacks: {
    jwt: ({ user, token }: { user: any; token: any }) => {
      if (user) token.user = user
      return token
    },
    session: ({ session, token }: { session: any; token: any }) => {
      if (token) session.user = token.user
      return session
    }
  },
  pages: {
    signIn: '/sign-in'
  }
}
export const auth = () => getServerSession(authOptions)

export default NextAuth(authOptions)
