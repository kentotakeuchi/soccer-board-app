import { Resolvers, Player } from './types'
import { connect } from '../db'
import { PlayerDbObject } from '../db/types'
import { ObjectId } from 'mongodb'

const dbPromise = connect()

// get player's collection
const getCollection = async (collectionName: string) => {
  const db = await dbPromise
  return db.collection<PlayerDbObject>(collectionName)
}

// convert db object into graphql object
const fromDbObject = (dbObject: PlayerDbObject): Player => ({
  playerId: dbObject._id.toHexString(),
  name: dbObject.name,
  photo: dbObject.photo,
  userId: dbObject.userId
})

// implement logic like controller in Nodejs
const resolvers: Resolvers = {
  Query: {
    allPlayers: async () => {
      const collection = await getCollection('players')
      return await collection.find().map(fromDbObject).toArray()
    },
    player: async (_: any, { playerId }) => {
      const collection = await getCollection('players')
      const dbObject = await collection.findOne({
        _id: ObjectId.createFromHexString(playerId)
      })
      if (!dbObject) throw Error('The player was not found.')
      return fromDbObject(dbObject)
    }
  },
  Mutation: {
    createPlayer: async (_: any, { data, userId }) => {
      const playerObject: Omit<PlayerDbObject, '_id'> = {
        name: data.name || 'name',
        photo: data.photo,
        userId: userId
      }

      const playersCollection = await getCollection('players')
      const document = await playersCollection.insertOne(playerObject)
      return fromDbObject({
        ...playerObject,
        _id: document.insertedId
      })
    },
    updatePlayer: async (_: any, { playerId, data }) => {
      const collection = await getCollection('players')
      const result = await collection.findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(playerId)
        },
        { $set: data },
        {
          returnOriginal: false
        }
      )

      if (!result.value) throw Error('Something wrong while updating.')
      return fromDbObject(result.value)
    }
  }
}

export default resolvers
