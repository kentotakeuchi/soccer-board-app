import { MongoClient, Db } from 'mongodb'
export * from './types'

const uri = `${process.env.DATABASE_URL}`
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

if (!process.env.DATABASE_URL) {
  throw new Error('Please add your Mongo URI to .env.local')
}

export let client: MongoClient
export let database: Db

export const connect = async (): Promise<Db> => {
  if (!database) {
    console.info(`Connecting to database ${uri}`)
    client = await MongoClient.connect(uri, options)
    database = client.db(process.env.DATABASE_DBNAME)
  }

  return database
}
