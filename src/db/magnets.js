import { db } from './connection'

export async function magnets(offfset, first) {
  return db.select('*').from('magnets').offset(offfset).limit(first)
}

export async function magnet(id) {
  // eslint-disable-next-line camelcase
  return db.select('*').from('magnets').where({ magnet_id: id }).first()
}
