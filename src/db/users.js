import { db } from './connection'

export async function users(offfset, first) {
  return db.select('*').from('users').offset(offfset).limit(first)
}

export async function user(id) {
  console.log('WOW', id)
  // eslint-disable-next-line camelcase
  return db.select('*').from('users').where({ user_id: id }).first()
}
