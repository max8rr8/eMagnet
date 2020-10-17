import { db } from './connection'

export const usersCollection = db.collection('users')

export function requestUsers(pipeline) {
  return usersCollection.aggregate(pipeline).toArray()
}

export async function requestUser(pipeline) {
  return (await usersCollection.aggregate(pipeline).toArray())[0]
}

export const serializePublic = () => ({
  $replaceWith: {
    magnets: {
      $map: {
        input: '$magnets',
        as: 'magnet',
        in: {
          count: '$$magnet.count',
          type: {
            $toString: '$$magnet.type'
          }
        }
      }
    },
    id: {
      $toString: '$_id'
    },
    nick: '$nick',
    email: '$email'
  }
})

export async function checkIfEmailFree(email) {
  return (
    (await usersCollection.findOne({
      email
    })) === null
  )
}

export async function addUser(user) {
  return (await usersCollection.insertOne(user)).insertedId
}
