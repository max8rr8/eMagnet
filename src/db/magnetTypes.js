import { db } from './connection'

export async function magnetTypes(offfset, first) {
  return db.select('*').from('magnet_types').offset(offfset).limit(first)
}

export async function magnetType(id) {
  return db
    .select('*')
    .from('magnet_types')
    .where({ magnet_type_id: id }) // eslint-disable-line camelcase
    .first()
}
