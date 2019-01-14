import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Item from '../dbs/models/items'
import Collection from '../dbs/models/collections'
import User from '../dbs/models/users'
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
      label,
      status: '0'
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
  const limit = parseInt(ctx.query.limit ? ctx.query.limit : 20)
  const offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  const status = ctx.query.status ? ctx.query.status : '1'
  if (ctx.query.title) {
    title = decodeURIComponent(ctx.query.title)
  }
  let items = await Item.find({
    category: { $regex: ctx.query.category ? ctx.query.category : '' },
    status,
    title: {
      $regex: title ? title : ''
    }
  })
    .skip(offset)
    .limit(limit)
    .lean()
  for (let i = 0; i < items.length; i++) {
    let itemid = items[i]._id
    let userid = items[i].creator
    items[i].collectioncount = await Collection.countDocuments({
      itemid
    })
    items[i].creatorinfo = await User.findOne({
      _id: userid
    })
    items[i].create = new Date(items[i].create).toLocaleDateString()
  }
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
  const status = ctx.query.status ? ctx.query.status : '1'
  let items = await Item.find({ creator: ctx.query.creator, status })
    .limit(limit)
    .skip(offset)
    .lean()
  for (let i = 0; i < items.length; i++) {
    let itemid = items[i]._id
    items[i].collectioncount = await Collection.countDocuments({
      itemid
    })
    items[i].create = new Date(items[i].create).toLocaleDateString()
  }
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
  }).lean()
  item.collectioncount = await Collection.countDocuments({
    itemid: _id
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

router.post('/reviewItem', async (ctx, next) => {
  console.log('123')
  const { _id, status } = ctx.request.body
  let result = await Item.updateOne(
    { _id },
    {
      status
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

router.get('/getItemList', async (ctx, next) => {
  let results = {}
  let limit = parseInt(ctx.query.limit ? ctx.query.limit : 20)
  let offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  let title = ctx.query.title ? ctx.query.title : ''
  let status = ctx.query.status ? ctx.query.status : ''
  let ishot = ctx.query.ishot ? ctx.query.ishot : ''
  let category = ctx.query.category ? ctx.query.category : ''
  let creator = ctx.query.creator ? ctx.query.creator : ''
  if (creator) {
    let result = await User.findOne({
      username: creator
    })
    if (result) {
      creator = result._id
    }
  }
  let count = await Item.countDocuments({
    title: { $regex: title },
    status: { $regex: status },
    category: { $regex: category },
    creator: { $regex: creator },
    ishot: { $regex: ishot }
  })
  if (count > 0) {
    results = await Item.find({
      title: { $regex: title },
      status: { $regex: status },
      category: { $regex: category },
      creator: { $regex: creator },
      ishot: { $regex: ishot }
    })
      .limit(limit)
      .skip(offset)
      .lean()
    for (let i = 0; i < results.length; i++) {
      let creator = results[i].creator
      let result = await User.findOne({ _id: creator })
      if (result) {
        results[i].creator = result.username
      }
      results[i].create = new Date(results[i].create).toLocaleDateString()
    }
  }
  if (results.length > 0) {
    ctx.body = {
      code: 0,
      data: { count, results },
      msg: ''
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'create error'
    }
  }
})
router.post('/removeItem', async (ctx, next) => {
  const _id = ctx.request.body
  let result = await Item.remove({ _id })
  if (result) {
    ctx.body = {
      code: 0,
      data: result,
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
