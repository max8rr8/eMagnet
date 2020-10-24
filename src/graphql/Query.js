import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'
import joinMonster from 'join-monster'
import { forwardConnectionArgs } from 'graphql-relay'
import { db } from '../db/connection'
import { User, UserConnection } from './User'
import { Magnet, MagnetConnection } from './Magnet'
import { MagnetType, MagnetTypeConnection } from './MagnetType'

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: UserConnection.connectionType,
      args: forwardConnectionArgs,
      extensions: {
        joinMonster: {
          sqlPaginate: true,
          orderBy: 'user_id'
        }
      },
      resolve: (_, _2, ctx, info) =>
        joinMonster(info, ctx, (sql) => db.raw(sql), {
          dialect: 'pg'
        })
    },
    user: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      extensions: {
        joinMonster: {
          where: (usersTable, args) => `${usersTable}.user_id = ${args.id}`
        }
      },
      resolve: (_, _2, ctx, info) =>
        joinMonster(info, ctx, (sql) => db.raw(sql), {
          dialect: 'pg'
        })
    },
    me: {
      type: User,
      extensions: {
        joinMonster: {
          where: (usersTable, args, ctx) =>
            `${usersTable}.user_id = ${ctx.userID}`
        }
      },
      resolve: (_, _2, ctx, info) =>
        joinMonster(info, ctx, (sql) => db.raw(sql), {
          dialect: 'pg'
        })
    },

    magnets: {
      type: MagnetConnection.connectionType,
      args: forwardConnectionArgs,
      extensions: {
        joinMonster: {
          sqlPaginate: true,
          orderBy: 'magnet_id'
        }
      },
      resolve: (_, _2, ctx, info) =>
        joinMonster(info, ctx, (sql) => db.raw(sql), {
          dialect: 'pg'
        })
    },
    magnet: {
      type: Magnet,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      extensions: {
        joinMonster: {
          where: (usersTable, args) => `${usersTable}.magnet_id = ${args.id}`
        }
      },
      resolve: (_, _2, ctx, info) =>
        joinMonster(info, ctx, (sql) => db.raw(sql), {
          dialect: 'pg'
        })
    },

    magnetTypes: {
      type: MagnetTypeConnection.connectionType,
      args: forwardConnectionArgs,
      extensions: {
        joinMonster: {
          sqlPaginate: true,
          orderBy: 'magnet_type_id'
        }
      },
      resolve: (_, _2, ctx, info) =>
        joinMonster(info, ctx, (sql) => db.raw(sql), {
          dialect: 'pg'
        })
    },

    magnetType: {
      type: MagnetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      extensions: {
        joinMonster: {
          where: (usersTable, args) =>
            `${usersTable}.magnet_type_id = ${args.id}`
        }
      },
      resolve: (_, _2, ctx, info) =>
        joinMonster(info, ctx, (sql) => db.raw(sql), {
          dialect: 'pg'
        })
    },

    isLoggedIn: {
      type: GraphQLBoolean,
      resolve: (_, _2, ctx) => ctx.userID !== null
    }
  }
})
