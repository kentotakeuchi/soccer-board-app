import { MongoClient, Db } from 'mongodb'
export * from './types'

export let client: MongoClient
export let database: Db

export const connect = async (): Promise<Db> => {
  if (!database) {
    console.info(`Connecting to database ${process.env.DATABASE_URL}`)
    client = await MongoClient.connect(process.env.DATABASE_URL)
    database = client.db(process.env.DATABASE_DBNAME)
  }

  return database
}
