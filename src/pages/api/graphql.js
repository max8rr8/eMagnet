import { GraphQLSchema } from 'graphql'
import { ApolloServer } from 'apollo-server-micro'
import { query } from '../../graphql/Query'
import { mutation } from '../../graphql/Mutation'
import { verify } from '../../jwt'
import { db } from '../../db/connection'

async function getUserID(ctx) {
  try {
    return await verify(ctx.req.cookies.user)
  } catch {
    return null
  }
}

export async function context(ctx) {
  const token = await getUserID(ctx)

  let userID = token ? token.user : null
  if (typeof userID !== 'number') userID = null
  const c = await db.count('*').from('users').where({ user_id: userID }) // eslint-disable-line camelcase
  const exists = c[0] && c[0].count === '1'

  if (!exists) userID = null

  return { userID }
}

const schema = new GraphQLSchema({
  query,
  mutation
})

const apolloServer = new ApolloServer({
  context,
  schema
})
export default apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false
  }
}
