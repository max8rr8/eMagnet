import { MongoClient } from 'mongodb'

const mongoClient = new MongoClient('mongodb://localhost')
await mongoClient.connect()
export const db = mongoClient.db('eMagnet')
