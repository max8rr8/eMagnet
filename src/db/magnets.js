import { db } from './connection'

export const magnetsCollection = db.collection('magnets')

export function requestMagnets(pipeline) {
  return magnetsCollection.aggregate(pipeline).toArray()
}

export function requestMagnet(pipeline) {
  return magnetsCollection.aggregate(pipeline).toArray()[0]
}

export const serializePublic = () => ({
  $replaceWith: {
    id: {
      $toString: '$_id'
    },
    image: '$image',
    name: '$name'
  }
})
