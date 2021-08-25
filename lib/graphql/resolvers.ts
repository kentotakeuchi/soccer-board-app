import { Resolvers, Player } from './types'
import { connect } from '../db'
import { PlayerDbObject } from '../db/types'
import { ObjectId } from 'mongodb'

const dbPromise = connect()

// get player's collection
const getCollection = async () => {
  const db = await dbPromise
  return db.collection<PlayerDbObject>('player')
}

// convert db object into graphql object
const fromDbObject = (dbObject: PlayerDbObject): Player => ({
  playerId: dbObject._id.toHexString(),
  name: dbObject.name,
  photo: dbObject.photo
})

// implement logic
const resolvers: Resolvers = {
  Query: {
    allPlayers: async () => {
      const collection = await getCollection()
      return await collection.find().map(fromDbObject).toArray()
    },
    player: async (_: any, { playerId }) => {
      const collection = await getCollection()
      const dbObject = await collection.findOne({
        _id: ObjectId.createFromHexString(playerId)
      })
      return fromDbObject(dbObject)
    }
  },
  Mutation: {
    createPlayer: async (_: any, { data }) => {
      const playerObject: Omit<PlayerDbObject, '_id'> = {
        name: data.name || 'name',
        photo: data.photo
      }

      const collection = await getCollection()
      const document = await collection.insertOne(playerObject)
      return fromDbObject({
        ...playerObject,
        _id: document.insertedId
      })
    },
    updatePlayer: async (_: any, { playerId, data }) => {
      const collection = await getCollection()
      const result = await collection.findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(playerId)
        },
        { $set: data },
        {
          returnOriginal: false
        }
      )

      return fromDbObject(result.value)
    }
  }
}

export default resolvers
