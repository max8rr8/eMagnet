import { randomBytes, pbkdf2 } from 'crypto'

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

export function validPassword(password, hash, salt) {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 1000, 64, 'sha512', (err, correctHash) => {
      if (err) reject(err)
      resolve(hash === correctHash.toString('hex'))
    })
  })
}
