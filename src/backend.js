import Koa from 'koa'
import koaStatic from 'koa-static'
import path from 'path'
import { apollo } from './apollo/server'
import { render as renderSSR } from './ssr'

const app = new Koa()

apollo.applyMiddleware({ app })
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(renderSSR)

app.listen(3000)
