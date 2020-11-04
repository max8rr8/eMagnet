import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'
import { hashPassword, validPassword } from '../utils/cryptoPassword'
import { sign } from '../jwt'
import { db } from '../db/connection'
import { validateEmail, validatePassword } from '../utils/registerValidation'

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        nick: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      type: new GraphQLObjectType({
        name: 'RegisterResponse',
        fields: {
          token: {
            type: GraphQLString
          }
        }
      }),
      resolve: async (_, { email, password, nick }) => {
        if (!validateEmail(email)) throw new UserInputError('Email invalid')
        if (!validatePassword(password))
          throw new UserInputError('Password invalid')
        if (nick.length < 5) throw new UserInputError('Nick invalid')
        if ((await db.select(1).from('users').where({ email })).length > 0)
          throw new UserInputError('Email already used')

        const { hash, salt } = await hashPassword(password)
        const id = await db
          .into('users')
          .insert({
            email,
            nick,
            password: hash,
            salt
          })
          .returning('user_id')

        const token = await sign({
          user: id[0]
        })

        return { token }
      }
    },
    login: {
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      type: new GraphQLObjectType({
        name: 'LoginResponse',
        fields: {
          token: {
            type: GraphQLString
          }
        }
      }),
      resolve: async (_, { email, password }) => {
        const users = await db
          .select(['user_id', 'password', 'salt'])
          .from('users')
          .where({ email })
        if (users.length === 0)
          throw new UserInputError('No user with this email')

        const { password: hash, salt, user_id: id } = users[0]
        if (!(await validPassword(password, hash, salt)))
          throw new UserInputError('Incorrect password')

        const token = await sign({
          user: id
        })

        console.log(token)

        return { token }
      }
    },
    createMagnet: {
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        mainColor: {
          type: new GraphQLNonNull(GraphQLString)
        },
        secondColor: {
          type: new GraphQLNonNull(GraphQLString)
        },
        icon: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      type: new GraphQLObjectType({
        name: 'MagnetCreateResponse',
        fields: {
          id: {
            type: GraphQLInt
          }
        }
      }),
      resolve: async (_, { name, mainColor, secondColor, icon }, ctx) => {
        if ((await db.select(1).from('magnets').where({ name })).length > 0)
          throw new UserInputError('Magnet with this name already exists')

        if (
          (
            await db.select(1).from('magnets').where({
              main_color: mainColor, // eslint-disable-line camelcase
              second_color: secondColor, // eslint-disable-line camelcase
              icon
            })
          ).length > 0
        )
          throw new UserInputError('Magnet with this design already exists')

        if (!ctx.userID) throw new AuthenticationError()

        const ids = await db
          .insert({
            name,
            main_color: mainColor, // eslint-disable-line camelcase
            second_color: secondColor, // eslint-disable-line camelcase
            icon,
            author: ctx.userID
          })
          .into('magnets')
          .returning('magnet_id')
        return {
          id: ids[0]
        }
      }
    }
  }
})
