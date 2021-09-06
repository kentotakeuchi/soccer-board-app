import NextAuth, { User as NextAuthUser } from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import Models from '../../../lib/db/models'
interface NextAuthUserWithStringId extends NextAuthUser {
  id: string
}

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
      clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET,
      profile(profile: any) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url
        } as NextAuthUserWithStringId
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

  // todo: insert custom field in user model
  // // Extend the built-in models
  // adapter: Adapters.TypeORM.Adapter(
  //   // The first argument should be a database connection string or TypeORM config object
  //   process.env.DATABASE_URL ||
  //     `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.khcn5.mongodb.net/${process.env.DATABASE_DBNAME}?retryWrites=true&w=majority`,
  //   // The second argument can be used to pass custom models and schemas
  //   {
  //     models: {
  //       User: Models.User
  //     }
  //   }
  // )

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL
})
