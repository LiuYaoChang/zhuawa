// const Koa = require('koa');
const render = require('koa-ejs');
// const Router = require('koa-router')
const path = require('path')
const multer = require('koa-multer')


// const app = new Koa()
// const router = new Router()


const upload = multer({ dest: path.resolve(__dirname, './uploads')})

// router
//   .get('/hello', (ctx, next) => {
//     ctx.body = 'Hello World!';
//   })


var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
const router = new Router();
render(app, {
  root: path.resolve(__dirname, '../tpl'),
  layout: null,
  cache: false,
  viewExt: 'ejs'
})
router.get('/', async (ctx, next) => {
  // ctx.router available
  await ctx.render('upload', {
    body: 123
  })
});

router.post('/upload', upload.single('file'), (ctx, next) => {
  console.log('completed')
  ctx.body = 'upload success'
});

app
  .use(router.routes())
  .use(router.allowedMethods());
const port = 5000

app.listen(port, () => {
  console.log('server run:', port)
})
