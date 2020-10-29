import knex from 'knex'

const config = {
  client: 'pg',
  connection: process.env.DB_URL + '/e_magnet'
}

export const db = knex(config)

db.raw('SELECT 1').catch(() => {
  console.error(
    '\u001B[31m!!!! ATTENTION !!!!\u001B[0m\nLook like you forgot to enter DB_URL'
  )
})
