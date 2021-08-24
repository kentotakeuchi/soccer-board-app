import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import Models from '../../../lib/db/models'

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
      from: process.env.NEXTAUTH_SENDGRID_FROM
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

  // Extend the built-in models
  adapter: Adapters.TypeORM.Adapter(
    // The first argument should be a database connection string or TypeORM config object
    process.env.DATABASE_URL ||
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.khcn5.mongodb.net/${process.env.DATABASE_DBNAME}?retryWrites=true&w=majority`,
    // The second argument can be used to pass custom models and schemas
    {
      models: {
        User: Models.User
      }
    }
  ),

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL
})
