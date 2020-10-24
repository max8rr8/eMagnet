import { GraphQLInt, GraphQLObjectType } from 'graphql'
import { MagnetType } from './MagnetType'
import { User } from './User'
import { connectionDefinitions } from 'graphql-relay'

export const Magnet = new GraphQLObjectType({
  name: 'Magnet',
  extensions: {
    joinMonster: {
      sqlTable: 'magnets',
      uniqueKey: 'magnet_id'
    }
  },
  fields: () => ({
    id: {
      type: GraphQLInt,
      extensions: {
        joinMonster: {
          sqlColumn: 'magnet_id'
        }
      }
    },

    user: {
      type: User,
      extensions: {
        joinMonster: {
          sqlJoin: (magnetsTable, usersTable) =>
            `${magnetsTable}.user_id = ${usersTable}.user_id`
        }
      }
    },

    magnetType: {
      type: MagnetType,
      extensions: {
        joinMonster: {
          sqlJoin: (magnetsTable, usersTable) =>
            `${magnetsTable}.magnet_type_id = ${usersTable}.magnet_type_id`
        }
      }
    }
  })
})

export const MagnetConnection = connectionDefinitions({
  nodeType: Magnet,
  connectionFields: {
    total: { type: GraphQLInt }
  }
})
