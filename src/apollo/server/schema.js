import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from './typedefs.graphql'
import { resolvers } from './resolvers'
import joinMonsterAdapt from 'join-monster-graphql-tools-adapter'
import { joinMonsterCfg } from './join_monster'
export { typeDefs }

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

joinMonsterAdapt(schema, joinMonsterCfg)

export { schema }
