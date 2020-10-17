import { verify as verifyRaw, sign as signRaw } from 'jsonwebtoken'
import { readFileSync } from 'fs'

const jwtKey = readFileSync('jwt.key')

export function sign(inp) {
  return new Promise((resolve, reject) => {
    console.log('SINGING', inp)
    signRaw(inp, jwtKey, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export function verify(inp) {
  return new Promise((resolve, reject) => {
    verifyRaw(inp, jwtKey, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
