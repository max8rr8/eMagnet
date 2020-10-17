export function validatePassword(string) {
  if (string.length < 8) return false
  for (let i = 0; i < string.length - 1; i++) {
    if (string[i].toLowerCase() < 'a' && string[i].toLowerCase() > 'z')
      return false
  }

  return true
}
