import { verify as verifyRaw, sign as signRaw } from 'jsonwebtoken'
import { readFileSync } from 'fs'

const jwtKey = readFileSync('jwt.key')

/**
 * Подписывает что-то с помощью jwt токена
 *
 * @param {*} inp Что надо подписать
 * @returns {Promise<string>}
 */
export function sign(inp) {
  return new Promise((resolve, reject) => {
    console.log('SINGING', inp)
    signRaw(inp, jwtKey, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

/**
 * Декодирует и проверяет токен
 *
 * @param {string} inp Что нужно декодировать и проверить
 * @returns {*}
 */
export function verify(inp) {
  return new Promise((resolve, reject) => {
    verifyRaw(inp, jwtKey, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
