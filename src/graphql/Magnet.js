import { GraphQLString, GraphQLInt, GraphQLObjectType } from 'graphql'
import { User } from './User'
import { UserMagnetConnection } from './UserMagnet'
import { forwardConnectionArgs, connectionDefinitions } from 'graphql-relay'

export const Magnet = new GraphQLObjectType({
  name: 'MagnetType',
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
          sqlColumn: 'main_color'
        }
      }
    },

    secondColor: {
      type: GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: 'second_color'
        }
      }
    },

    icon: {
      type: GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: 'icon'
        }
      }
    },

    author: {
      type: User,
      extensions: {
        joinMonster: {
          sqlJoin: (magnetsTable, usersTable) =>
            `${magnetsTable}.author = ${usersTable}.user_id`
        }
      }
    },

    usersMagnet: {
      type: UserMagnetConnection.connectionType,
      args: forwardConnectionArgs,
      extensions: {
        joinMonster: {
          sqlPaginate: true,
          orderBy: 'magnet_id',
          sqlJoin: (magnetsTable, userMagnetsTable) =>
            `${magnetsTable}.magnet_id = ${userMagnetsTable}.magnet_id`
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
