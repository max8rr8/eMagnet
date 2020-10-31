import React, { useEffect } from 'react'
import { ApolloProvider, gql, ApolloClient } from '@apollo/client'
import { initOnContext, initApolloClient } from '../apolloClient'
import NextApp from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import { useTheme } from '../useTheme'
import AppBar from '../components/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import { getCookie } from '../getCookie'
import Router from 'next/router'

/**
 * Компонент на котором основываются страницы
 *
 * @param {object} props Component props
 * @param {React.ReactElement}  props.Component Компонент странички
 * @param {object} props.pageProps Props страницы
 * @param {ApolloClient} props.apolloClient Клиент Apollo
 * @param {object} props.apolloState Состояние apollo
 * @param {string} props.initialTheme изначальная тема
 * @returns {React.ReactElement}
 */
function App({
  Component,
  pageProps,
  apolloClient,
  apolloState,
  initialTheme
}) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) jssStyles.remove()
  }, [])

  const client = apolloClient
    ? apolloClient
    : initApolloClient(apolloState, undefined)

  const [theme, toggleTheme] = useTheme(initialTheme)

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>{Component.title}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar title={Component.title} toggleTheme={toggleTheme} />
        <div style={{ margin: 4 }}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  )
}

App.getInitialProps = async function (ctx) {
  console.log(ctx)
  const { apolloClient } = initOnContext(ctx)

  if (
    ctx.Component.login === 'requires' ||
    ctx.Component.login === 'restricts'
  ) {
    const loggedIn = (
      await apolloClient.query({
        query: gql`
          query {
            isLoggedIn
          }
        `
      })
    ).data.isLoggedIn
    if (ctx.Component.login === 'requires' && !loggedIn) {
      if (ctx.ctx.res) {
        ctx.ctx.res.writeHead(302, { Location: '/login' })
        ctx.ctx.res.end('Please login at /login')
        return {}
      }

      Router.push('/login')
    }

    if (ctx.Component.login === 'restricts' && loggedIn) {
      if (ctx.ctx.res) {
        ctx.ctx.res.writeHead(302, { Location: '/me' })
        ctx.ctx.res.end('You are logged in already /me')
        return {}
      }

      Router.push('/me')
    }

    console.log(loggedIn)
  }

  const pageProps = await NextApp.getInitialProps(ctx)

  if (typeof window === 'undefined') {
    const { AppTree } = ctx
    if (ctx.res && ctx.res.finished) {
      return pageProps
    }

    if (AppTree) {
      try {
        const { getDataFromTree } = await import('@apollo/client/react/ssr')
        const props = { ...pageProps, apolloClient }
        await getDataFromTree(<AppTree {...props} />)
      } catch (error) {
        console.error('Error while running `getDataFromTree`', error)
      }
    }
  }

  return {
    ...pageProps,
    apolloState: apolloClient.cache.extract(),
    apolloClient: ctx.apolloClient,
    initialTheme:
      typeof window === 'undefined'
        ? ctx.ctx.req.cookies.theme
        : getCookie('theme')
  }
}

export default App
