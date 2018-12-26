//const Koa = require('koa')
import Koa from 'koa'
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './utils/passport'
import users from './interface/users'
import items from './interface/items'
import categorys from './interface/categorys'
import labels from './interface/labels'
import hots from './interface/hots'
import fans from './interface/fans'
import collections from './interface/collections'
import draft from './interface/drafts'
import utils from './utils/upload'

const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.keys = ['mumutea', 'keyskeys']
//Session config
app.proxy = true
app.use(
  session({
    key: 'mumutea',
    prefix: 'mumutea:uid',
    store: new Redis()
  })
)
app.use(bodyParser({ extendTypes: ['json', 'form', 'text'] }))
app.use(json())
//DB config
mongoose.connect(
  dbConfig.dbs,
  {
    useNewUrlParser: true
  }
)
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  //Init router
  app.use(users.routes()).use(users.allowedMethods())
  app.use(items.routes()).use(items.allowedMethods())
  app.use(categorys.routes()).use(categorys.allowedMethods())
  app.use(labels.routes()).use(labels.allowedMethods())
  app.use(hots.routes()).use(hots.allowedMethods())
  app.use(fans.routes()).use(fans.allowedMethods())
  app.use(collections.routes()).use(collections.allowedMethods())
  app.use(utils.routes()).use(utils.allowedMethods())
  app.use(draft.routes()).use(draft.allowedMethods())
  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
