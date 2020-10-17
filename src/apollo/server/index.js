import { ApolloServer } from 'apollo-server-koa'
import typeDefs from './typedefs.graphql'
import { resolvers } from './resolvers'
import { context } from './context'

export { typeDefs }
export const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  uploads: false
})
