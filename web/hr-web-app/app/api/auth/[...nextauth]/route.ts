import { User } from "@/types/userTypes";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {

    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            id: "id-server",
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password", placeholder: '******' }
            },
            async authorize(credentials, req) {

                const res = await fetch("http://localhost:7000/api/account/login", {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })

                const user = await res.json()

                if (res.ok && user) {
                    return user
                }

                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.displayName = user.displayName
                token.username = user.username
                token.token = user.token
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.displayName = token.displayName
                session.user.username = token.username
                session.user.token = token.token
                session.user.role = token.role
            }
            return session
        }
    }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }