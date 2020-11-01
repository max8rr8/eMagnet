/**
 * Чекает пароль:
 * - правильные буквы/цифры
 * - длинна больше 8
 *
 * @param {string} string Пароль
 * @returns {boolean} Правильный ли пароль
 */
export function validatePassword(string) {
  if (string.length < 8) return false
  for (let i = 0; i < string.length - 1; i++) {
    if (string[i].toLowerCase() < 'a' && string[i].toLowerCase() > 'z')
      return false
  }

  return true
}
