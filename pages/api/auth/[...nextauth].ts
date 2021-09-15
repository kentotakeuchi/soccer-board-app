import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { Profile, Session, User } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import TwitterProvider from 'next-auth/providers/twitter'
import GithubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { connect } from '../../../lib/db'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      EmailProvider({
        server: {
          host: process.env.NEXTAUTH_SENDGRID_HOST,
          port: process.env.NEXTAUTH_SENDGRID_PORT,
          auth: {
            user: process.env.NEXTAUTH_SENDGRID_USER,
            pass: process.env.NEXTAUTH_SENDGRID_PASSWORD
          }
        },
        from: process.env.NEXTAUTH_SENDGRID_FROM
      }),
      TwitterProvider({
        clientId: process.env.NEXTAUTH_TWITTER_CLIENT_ID,
        clientSecret: process.env.NEXTAUTH_TWITTER_CLIENT_SECRET
      }),
      GithubProvider({
        clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET,
        profile(profile) {
          // console.log({ profile, tokens })
          return {
            ...profile,
            name: profile.login
          }
        }
      })
      // ...add more providers here
    ],

    session: {
      // Use JSON Web Tokens for session instead of database sessions.
      // This option can be used with or without a database for users/accounts.
      // Note: `jwt` is automatically set to `true` if no database is specified.
      jwt: true,

      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      updateAge: 24 * 60 * 60 // 24 hours
    },

    // todo: delete later
    debug: true,

    adapter: MongoDBAdapter({
      db: await connect()
    }),

    callbacks: {
      async jwt({ token, user, account, profile, isNewUser }) {
        // console.log({ token, user, account, profile, isNewUser })
        if (user) {
          token.uid = user.id
        }
        return token
      },
      async session({ session, user, token }) {
        // console.log({ session, user, token })
        session.id = token.uid
        return session
      }
    }
  })
}
