import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { hashPassword } from '../utils/cryptoPassword'
import { sign } from '../jwt'
import { db } from '../db/connection'

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
        console.log(id)

        const token = await sign({
          user: id[0]
        })

        return { token }
      }
    }
  }
})
