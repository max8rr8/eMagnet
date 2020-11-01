import { GraphQLInt, GraphQLObjectType } from 'graphql'
import { Magnet } from './Magnet'
import { User } from './User'
import { connectionDefinitions } from 'graphql-relay'

export const UserMagnet = new GraphQLObjectType({
  name: 'UserMagnet',
  extensions: {
    joinMonster: {
      sqlTable: 'users_magnets',
      uniqueKey: 'user_magnet_id'
    }
  },
  fields: () => ({
    id: {
      type: GraphQLInt,
      extensions: {
        joinMonster: {
          sqlColumn: 'user_magnet_id'
        }
      }
    },

    user: {
      type: User,
      extensions: {
        joinMonster: {
          sqlJoin: (userMagnetsTable, usersTable) =>
            `${userMagnetsTable}.user_id = ${usersTable}.user_id`
        }
      }
    },

    magnet: {
      type: Magnet,
      extensions: {
        joinMonster: {
          sqlJoin: (userMagnetsTable, magnetsTable) =>
            `${userMagnetsTable}.magnet_id = ${magnetsTable}.magnet_id`
        }
      }
    }
  })
})

export const UserMagnetConnection = connectionDefinitions({
  nodeType: UserMagnet,
  connectionFields: {
    total: { type: GraphQLInt }
  }
})
