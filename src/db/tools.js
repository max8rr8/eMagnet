import { ObjectID } from 'mongodb'

export const findById = (id) => ({
  $match: {
    _id: new ObjectID(id)
  }
})
