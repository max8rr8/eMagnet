// import { findById } from '../../db/tools'
// import {
//   // requestUsers,
//   // requestUser,
//   // serializePublic as serializePublicUser,
//   // addUser,
//   // checkIfEmailFree
//   user,
//   users
// } from '../../db/users'
// import { magnet_type, magnet_types } from '../../db/magnet_types'
// import { magnet, magnets } from '../../db/magnets'
// import {
//   requestMagnet,
//   serializePublic as serializePublicMagnet
// } from '../../db/magnets'
// import { validatePassword } from '../../utils/validatePassword'
// import { hashPassword } from '../../utils/cryptoPassword'
// import { UserInputError, AuthenticationError } from 'apollo-server-koa'
// import { sign } from '../../jwt'
import { db } from   '../../db/connection'
import joinMonster from 'join-monster'

export const resolvers = {
  Query: {
    // users: (_, { first, offset }) => users(offset, first),

    users: (_, { id }, ctx, resolveInfo) =>
      joinMonster(resolveInfo, ctx, (sql) => db.raw(sql), { dialect: 'pg' }),
    user: (_, { id }, ctx, resolveInfo) =>
      joinMonster(resolveInfo, ctx, (sql) => db.raw(sql), { dialect: 'pg' }),


    magnet_types: (_, { id }, ctx, resolveInfo) =>
      joinMonster(resolveInfo, ctx, (sql) => db.raw(sql), { dialect: 'pg' }),
    magnet_type: (_, { id }, ctx, resolveInfo) =>
      joinMonster(resolveInfo, ctx, (sql) => db.raw(sql), { dialect: 'pg' }),


    magnets: (_, { id }, ctx, resolveInfo) =>
      joinMonster(resolveInfo, ctx, (sql) => db.raw(sql), { dialect: 'pg' }),
    magnet: (_, { id }, ctx, resolveInfo) =>
      joinMonster(resolveInfo, ctx, (sql) => db.raw(sql), { dialect: 'pg' })

    // magnet_types: (_, { first, offset }) => magnet_types(offset, first),
    // magnet_type: (_, { id }) => magnet_type(id),

    // magnets: async (_, { first, offset }) => await magnets(offset, first),
    // magnet: (_, { id }) => magnet(id),

    // me: async (_, _2, ctx) => {
    //   console.log('USER id', ctx.userID)
    //   if (!ctx.userID) throw new AuthenticationError()

    //   return {}
    // }
  }

  // User: {
  //   id: (parent) => parent['user_id']
  // },

  // MagnetType: {
  //   id: (parent) => parent['magnet_type_id'],
  //   created_by: (parent) => user(parent.created_by)
  // },

  // Magnet: {
  //   id: (parent) => parent['magnet_id'],
  //   user: (parent) => user(parent['user_id']),
  //   magnet_type: (parent) => magnet_type(parent['magnet_type_id'])
  // },

  // Mutation: {
  //   register: async (_, { email, password, nick }) => {
  //     if (!validatePassword(password))
  //       throw new UserInputError('Incorrect password', {
  //         invalidArgs: 'password'
  //       })

  //     if (!checkIfEmailFree(email))
  //       throw new UserInputError('Email already used', {
  //         invalidArgs: 'email'
  //       })

  //     const id = await addUser({
  //       email,
  //       nick,
  //       ...(await hashPassword(password))
  //     })

  //     const token = await sign({
  //       user: id.toString()
  //     })

  //     console.log('Register', email, password, nick)
  //     return token
  //   },

  //   login: async (_, { email, password, name }) => {
  //     console.log('Login', email, password, name)
  //   }
  // }
}
