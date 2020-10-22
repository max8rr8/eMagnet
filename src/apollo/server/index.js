import { ApolloServer } from 'apollo-server-koa'
import { schema } from './schema'
import { context } from './context'

export const apollo = new ApolloServer({
  schema,
  context,
  uploads: false
})
