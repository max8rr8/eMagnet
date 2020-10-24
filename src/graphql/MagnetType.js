import { GraphQLString, GraphQLInt, GraphQLObjectType } from 'graphql'
import { User } from './User'
import { MagnetConnection } from './Magnet'
import { forwardConnectionArgs, connectionDefinitions } from 'graphql-relay'

export const MagnetType = new GraphQLObjectType({
  name: 'MagnetType',
  extensions: {
    joinMonster: {
      sqlTable: 'magnet_types',
      uniqueKey: 'magnet_type_id'
    }
  },
  fields: () => ({
    id: {
      type: GraphQLInt,
      extensions: {
        joinMonster: {
          sqlColumn: 'magnet_type_id'
        }
      }
    },

    name: {
      type: GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: 'name'
        }
      }
    },

    mainColor: {
      type: GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: 'name'
        }
      }
    },

    secondColor: {
      type: GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: 'name'
        }
      }
    },

    icon: {
      type: GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: 'name'
        }
      }
    },

    createdBy: {
      type: User,
      extensions: {
        joinMonster: {
          sqlJoin: (magnetsTable, usersTable) =>
            `${magnetsTable}.created_by = ${usersTable}.user_id`
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
            `${magnetsTable}.magnet_type_id = ${usersTable}.magnet_type_id`
        }
      }
    }
  })
})

export const MagnetTypeConnection = connectionDefinitions({
  nodeType: MagnetType,
  connectionFields: {
    total: { type: GraphQLInt }
  }
})
