import knex from 'knex'

const config = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'onlyhope',
    database: 'e_magnet'
  }
}

export const db = knex(config)

// eslint-disable-next-line camelcase
console.log(await db.select('*').from('users').where({ user_id: 1 }))
