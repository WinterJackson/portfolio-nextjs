import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import prisma from './prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    trustHost: true,
    debug: process.env.NODE_ENV === 'development',
    pages: {
        signIn: '/admin/login',
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                console.log('Authorize called with credentials:', { email: credentials?.email })

                if (!credentials?.email || !credentials?.password) {
                    console.log('Missing credentials in authorize')
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                })
                console.log('User found in DB:', user ? 'Yes' : 'No')

                if (!user || !user.password) {
                    console.log('User not found or has no password')
                    return null
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )
                console.log('Password validation result:', isPasswordValid)

                if (!isPasswordValid) {
                    console.log('Invalid password')
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        },
    },
})
