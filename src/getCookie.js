/**
 * Берёт куку из document.cookies и возвращает её
 *
 * @param {string} name Название куки
 * @returns {string}
 */
export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}
