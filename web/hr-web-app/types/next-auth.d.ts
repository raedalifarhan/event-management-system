
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            username: string
            displayName: string
            token: string
            role: string
        } & DefaultSession['user']
    }
    
    interface User {
        displayName: string,
        username: string
        token: string
        role: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        token: string
        username: string
        displayName: string
        role: string
    }
}