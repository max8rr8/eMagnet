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
