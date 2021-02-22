// const Koa = require('koa');
const render = require('koa-ejs');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
// const Router = require('koa-router')
const path = require('path')
const multer = require('koa-multer')
const serve = require('koa-static');
const validPort = require('../utils/index');
const argv = yargs(hideBin(process.argv)).argv
console.log('argv $ %o', argv)

const cacheModel = {
  'no_cache': {

  },

}
// const app = new Koa()
// const router = new Router()


// router
//   .get('/hello', (ctx, next) => {
//     ctx.body = 'Hello World!';
//   })


var Koa = require('koa');
var Router = require('koa-router');
const etag = require('koa-etag');
var fresh = require('koa-fresh');
const cacheControl = require('koa-cache-control');
var app = new Koa();


// app.use(async (ctx, next) => {
//   await next();
//   const htmlRE = /text\/html/;
//   console.log('content-type: %s', ctx.response.header['content-type'])
//   if (ctx.fresh && (!htmlRE.test(ctx.response.header['content-type']))) {
//     ctx.status = 304;
//   }
// })

app.use(fresh());
app.use(etag());

app.use(cacheControl({
  maxAge: 500
}))
app.use(serve(path.join(__dirname, '../tpl')))
const router = new Router();
render(app, {
  root: path.resolve(__dirname, '../tpl'),
  layout: null,
  cache: false,
  viewExt: 'ejs'
})
router.get('/', async (ctx, next) => {
  // ctx.router available
  await ctx.render('cache', {
    body: 123
  })
});

app
  .use(router.routes())
  .use(router.allowedMethods());
validPort().then(port => {
  app.listen(port, () => {
    console.log('server run:', port)
  })
})
