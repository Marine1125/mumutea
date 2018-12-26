import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Item from '../dbs/models/items'
import Collection from '../dbs/models/collections'
//文件上传

let router = new Router({
  prefix: '/items'
})

router.post('/addItem', async (ctx, next) => {
  const creator = ctx.session.passport.user._id
  console.log('123')
  const {
    title,
    category,
    tips,
    steps,
    ingredients,
    filename,
    summary,
    label
  } = ctx.request.body
  let newItem = await Item.create({
    title,
    category,
    tips,
    steps,
    ingredients,
    filename,
    summary,
    label,
    creator
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

router.post('/updateItem', async (ctx, next) => {
  console.log('123')
  const {
    _id,
    title,
    category,
    tips,
    steps,
    ingredients,
    filename,
    summary,
    label
  } = ctx.request.body
  let result = await Item.updateOne(
    { _id },
    {
      title,
      category,
      tips,
      steps,
      ingredients,
      filename,
      summary,
      label
    }
  )
  if (result) {
    ctx.body = {
      code: 0,
      data: _id,
      msg: ''
    }
  } else {
    ctx.body = {
      code: -1,
      data: '',
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

router.get('/getItemsByCreator', async (ctx, next) => {
  const offset = parseInt(ctx.query.offset)
  const limit = parseInt(ctx.query.limit)
  let items = await Item.find({ creator: ctx.query.creator })
    .limit(limit)
    .skip(offset)
    .lean()
  for (let i = 0; i < items.length; i++) {
    let itemid = items[i]._id
    items[i].collectioncount = await Collection.countDocuments({
      itemid
    })
  }
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

export default router
