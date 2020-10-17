import React from 'react'
import App from './App'
import { context as createContext } from './apollo/server/context'
import { StaticRouter } from 'react-router-dom'
import { renderToStringWithData } from '@apollo/client/react/ssr'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { schema } from './apollo/server/schema'

export async function render(ctx) {
  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: createContext({ ctx }) }),
    cache: new InMemoryCache()
  })

  const routerContext = {}
  const appHtml = await renderToStringWithData(
    <ApolloProvider client={client}>
      <StaticRouter location={ctx.path} context={routerContext}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  )

  if (routerContext.url && ctx.path !== routerContext.url) {
    console.log('Redirect to', routerContext.url)
    return ctx.redirect(routerContext.url)
  }

  ctx.body = `<html>\
<head><title>eMagnet</title></head>\
<body>\
<div id="app">${appHtml}</div>\
<script>window.__APOLLO_STATE__=${JSON.stringify(client.extract())};</script>\
<script src="/bundle.js"></script>\
</body>\
</html>`
}
