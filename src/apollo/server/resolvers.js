import { findById } from '../../db/tools'
import {
  requestUsers,
  requestUser,
  serializePublic as serializePublicUser,
  addUser,
  checkIfEmailFree
} from '../../db/users'
import {
  requestMagnet,
  serializePublic as serializePublicMagnet
} from '../../db/magnets'
import { validatePassword } from '../../utils/validatePassword'
import { hashPassword } from '../../utils/cryptoPassword'
import { UserInputError, AuthenticationError } from 'apollo-server-koa'
import { sign } from '../../jwt'

export const resolvers = {
  Query: {
    users: () => requestUsers([serializePublicUser()]),
    me: async (_, _2, ctx) => {
      console.log('USER id', ctx.userID)
      if (!ctx.userID) throw new AuthenticationError()

      return requestUser([findById(ctx.userID), serializePublicUser()])
    }
  },

  UserMagnet: {
    type: async (parent) =>
      requestMagnet([findById(parent.typ), serializePublicMagnet()])
  },

  Mutation: {
    register: async (_, { email, password, nick }) => {
      if (!validatePassword(password))
        throw new UserInputError('Incorrect password', {
          invalidArgs: 'password'
        })

      if (!checkIfEmailFree(email))
        throw new UserInputError('Email already used', {
          invalidArgs: 'email'
        })

      const id = await addUser({
        email,
        nick,
        ...(await hashPassword(password))
      })

      const token = await sign({
        user: id.toString()
      })

      console.log('Register', email, password, nick)
      return token
    },

    login: async (_, { email, password, name }) => {
      console.log('Login', email, password, name)
    }
  }
}
