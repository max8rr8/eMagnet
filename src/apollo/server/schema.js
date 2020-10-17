import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from './typedefs.graphql'
import { resolvers } from './resolvers'

export { typeDefs }
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
