const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^[\w!@#$%^&*()+[\]{}.,?;'":|\\/]*$/

/**
 * Чекает пароль:
 * - Магический regex
 * - длинна больше 8
 *
 * @param {string} string Пароль
 * @returns {boolean} Правильный ли пароль
 */
export function validatePassword(string) {
  if (string.length < 8) return false
  return passwordRegex.test(string)
}

/**
 * Чекает Почту:
 * - Магический regex
 *
 * @param {string} string Пароль
 * @returns {boolean} Правильный ли пароль
 */
export function validateEmail(string) {
  return emailRegex.test(string)
}
