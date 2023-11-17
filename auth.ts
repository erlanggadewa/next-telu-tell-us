import {getServerSession} from "next-auth/next";
import NextAuth, {AuthOptions, DefaultSession} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";
import {appConfig} from "@/config";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string,
            accessToken: string,
            sub: string,
        } & DefaultSession['user']
    }
}

export const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        CredentialProvider({
            name: 'credentials',
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            authorize: async (credentials) => {
                try {
                    const {data} = await axios.post(appConfig.apiUrl + '/auth/login', credentials)
                    if (data) {
                        const {data: user} = await axios.get(appConfig.apiUrl + '/auth/profile', {headers: {Authorization: `Bearer ${data.accessToken}`}})
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
        }),
    ],
    callbacks: {
        jwt: ({user, token}: { user: any, token: any }) => {
            if (user) token.user = user;
            return token;
        },
        session: ({session, token}: { session: any, token: any }) => {
            if (token) session.user = token.user;
            return session;
        },
    },
    pages: {
        signIn: '/sign-in',
    }
}
export const auth = () => getServerSession(authOptions)

export default NextAuth(authOptions)