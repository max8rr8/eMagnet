import { ApolloClient, InMemoryCache } from '@apollo/client'

let globalApolloClient = null
const clientCtx = { req: { headers: {} } }

/**
 * Функция которая создайт клиент apollo
 *
 * @param {object} initialState Изначальное состояние (при гидрации в браузере)
 * @param {object} ctx Контекст(в бразурер ничего, в ssr можно получить nodejs req и res)
 * @returns {ApolloClient}
 */
export const createApolloClient = (initialState, ctx = clientCtx) =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    uri:
      typeof window === 'undefined'
        ? 'http://localhost:3000/api/graphql'
        : '/api/graphql',
    cache: new InMemoryCache().restore(initialState),
    headers: ctx.req.headers
  })

/**
 * Создаёт apollo на контексте nextjs
 *
 * @param {object} ctx Контекст(в бразурер ничего, в ssr можно получить nodejs req и res)
 * @returns {object}
 */
export function initOnContext(ctx) {
  const apolloClient =
    ctx.apolloClient || initApolloClient(ctx.apolloState || {}, ctx.ctx)

  apolloClient.toJSON = () => null // eslint-disable-line react/function-component-definition
  ctx.apolloClient = apolloClient
  ctx.ctx.apolloClient = apolloClient

  return ctx
}

/**
 * Создаёт apollo clietn
 * - на ssr создаёт каждый раз нового
 * - в браузере берёт из глобального обьекта
 *
 * @param {object} initialState Изначальное состояние (при гидрации в браузере)
 * @param {object} ctx Контекст(в бразурер ничего, в ssr можно получить nodejs req и res)
 * @returns {ApolloClient}
 */
export function initApolloClient(initialState, ctx) {
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, ctx)
  }

  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, ctx)
  }

  return globalApolloClient
}
