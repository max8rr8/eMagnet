import { randomBytes, pbkdf2 } from 'crypto'

/**
 * Создаёт соль и с ей помощью хеширует пароль
 *
 * @param {string} password Пароль
 * @returns {Promise<object>} Salt and hash
 */
export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(16).toString('hex')
    pbkdf2(password, salt, 1000, 64, 'sha512', (err, hash) => {
      if (err) reject(err)
      resolve({
        salt,
        hash: hash.toString('hex')
      })
    })
  })
}

/**
 * Проверяет пароль
 *
 * @param {string} password Пароль для проверки
 * @param {string} hash хэщ правильного пароля
 * @param {string} salt Соль
 * @returns {Promise<boolean>}
 */
export function validPassword(password, hash, salt) {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 1000, 64, 'sha512', (err, correctHash) => {
      if (err) reject(err)
      resolve(hash === correctHash.toString('hex'))
    })
  })
}
