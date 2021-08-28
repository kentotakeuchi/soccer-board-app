import { MongoClient, Db } from 'mongodb'
export * from './types'

export let client: MongoClient
export let database: Db

export const connect = async (): Promise<Db> => {
  if (!database) {
    console.info(`Connecting to database ${process.env.DATABASE_URL}`)
    client = await MongoClient.connect(
      process.env.DATABASE_URL ||
        `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.khcn5.mongodb.net/${process.env.DATABASE_DBNAME}?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    )
    database = client.db(process.env.DATABASE_DBNAME)
  }

  return database
}
