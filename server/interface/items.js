import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Item from '../dbs/models/items'
//文件上传

let router = new Router({
  prefix: '/items'
})

//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function(req, file, cb) {
    console.log('----' + file + '-----')
    cb(null, 'static/uploads/')
  },
  //修改文件名称
  filename: function(req, file, cb) {
    var fileFormat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
//加载配置
var upload = multer({ storage: storage })
//路由
router.post('/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    file: ctx.req.file.path.replace('static\\', '') //返回文件路径
  }
})

router.post('/addItem', async (ctx, next) => {
  console.log('123')
  const {
    title,
    category,
    tips,
    steps,
    ingredients,
    filename
  } = ctx.request.body
  let newItem = await Item.create({
    title,
    category,
    tips,
    steps,
    ingredients,
    filename
  })
  if (newItem) {
    ctx.body = {
      code: 0,
      msg: ''
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'create error'
    }
  }
})

router.get('/getItems', async (ctx, next) => {
  let title = ''
  if (ctx.query.title) {
    title = decodeURIComponent(ctx.query.title)
  }
  let items = await Item.find({
    category: { $regex: ctx.query.category ? ctx.query.category : '' },
    title: {
      $regex: title ? title : ''
    }
  })
  console.log(items)
  if (items) {
    ctx.body = {
      code: 0,
      data: items,
      msg: ''
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'create error'
    }
  }
})

router.get('/getItemsByTitle', async (ctx, next) => {
  console.log(ctx.query.title)
  let title = ''
  if (ctx.query.title) {
    title = decodeURIComponent(ctx.query.title)
  }
  let items = await Item.find({ title: { $regex: title } }).limit(8)
  if (items) {
    ctx.body = {
      code: 0,
      data: items,
      msg: ''
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'create error'
    }
  }
})

router.get('/getItemDetail', async (ctx, next) => {
  console.log('123')
  let _id = ctx.query._id
  let item = await Item.findOne({
    _id
  })
  if (item) {
    ctx.body = {
      code: 0,
      data: item,
      msg: ''
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'data not exist'
    }
  }
})

router.get('/getHotItems', async (ctx, next) => {
  let items = await Item.find({
    category: { $regex: ctx.query.category ? ctx.query.category : '' },
    title: { $regex: ctx.query.keyword ? ctx.query.keyword : '' }
  }).limit(4)
  if (items) {
    ctx.body = {
      code: 0,
      data: items,
      msg: ''
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'create error'
    }
  }
})

export default router
