import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server: {
        host: process.env.NEXTAUTH_SENDGRID_HOST,
        port: process.env.NEXTAUTH_SENDGRID_PORT,
        auth: {
          user: process.env.NEXTAUTH_SENDGRID_USER,
          pass: process.env.NEXTAUTH_SENDGRID_PASSWORD
        }
      },
      from: process.env.NEXTAUTH_FROM
    }),
    Providers.Twitter({
      clientId: process.env.NEXTAUTH_TWITTER_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_TWITTER_CLIENT_SECRET
    }),
    Providers.GitHub({
      clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET
    })
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL
})
