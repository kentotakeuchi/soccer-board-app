import { Resolvers, TodoMvc } from './types'
import { connect } from '../db'
import { TodoMvcDbObject } from '../db/types'
import { ObjectId } from 'mongodb'

const dbPromise = connect()

const getCollection = async () => {
  const db = await dbPromise
  return db.collection<TodoMvcDbObject>('todos')
}

const fromDbObject = (dbObject: TodoMvcDbObject): TodoMvc => ({
  todoId: dbObject._id.toHexString(),
  completed: dbObject.completed,
  description: dbObject.description
})

const resolvers: Resolvers = {
  Query: {
    allTodos: async () => {
      const collection = await getCollection()
      return await collection.find().map(fromDbObject).toArray()
    },
    Todo: async (_: any, { todoId }) => {
      const collection = await getCollection()
      const dbObject = await collection.findOne({
        _id: ObjectId.createFromHexString(todoId)
      })
      return fromDbObject(dbObject)
    }
  },
  Mutation: {
    createTodo: async (_: any, { description }) => {
      const data: Omit<TodoMvcDbObject, '_id'> = {
        description,
        completed: false
      }

      const collection = await getCollection()
      const document = await collection.insertOne(data)
      return fromDbObject({
        ...data,
        _id: document.insertedId
      })
    },
    updateTodo: async (_: any, { todoId, data }) => {
      const collection = await getCollection()
      const result = await collection.findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(todoId)
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
