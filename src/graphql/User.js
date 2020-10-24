import { GraphQLString, GraphQLInt, GraphQLObjectType } from 'graphql'
import { MagnetConnection } from './Magnet'
import { forwardConnectionArgs, connectionDefinitions } from 'graphql-relay'
import { MagnetTypeConnection } from './MagnetType'

export const User = new GraphQLObjectType({
  name: 'User',
  extensions: {
    joinMonster: {
      sqlTable: 'users',
      uniqueKey: 'user_id'
    }
  },
  fields: () => ({
    id: {
      type: GraphQLInt,
      extensions: {
        joinMonster: {
          sqlColumn: 'user_id'
        }
      }
    },
    nick: {
      type: GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: 'nick'
        }
      }
    },
    email: {
      type: GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: 'email'
        }
      }
    },
    createdMagnetTypes: {
      type: MagnetTypeConnection.connectionType,
      args: forwardConnectionArgs,
      extensions: {
        joinMonster: {
          sqlPaginate: true,
          orderBy: 'magnet_type_id',
          sqlJoin: (magnetsTable, usersTable) =>
            `${magnetsTable}.user_id = ${usersTable}.created_by`
        }
      }
    },

    magnets: {
      type: MagnetConnection.connectionType,
      args: forwardConnectionArgs,
      extensions: {
        joinMonster: {
          sqlPaginate: true,
          orderBy: 'magnet_id',
          sqlJoin: (magnetsTable, usersTable) =>
            `${magnetsTable}.user_id = ${usersTable}.user_id`
        }
      }
    }
  })
})

export const UserConnection = connectionDefinitions({
  nodeType: User,
  connectionFields: {
    total: { type: GraphQLInt }
  }
})
