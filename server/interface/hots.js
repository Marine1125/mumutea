import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Item from '../dbs/models/items'
//文件上传

let router = new Router({
  prefix: '/hots'
})

router.post('/addHot', async (ctx, next) => {
  console.log(ctx.request.body)
  const _id = ctx.request.body._id
  const update = new Date()
  const result = await Item.updateOne({ _id }, { $set: { ishot: '1' } })
  if (result) {
    ctx.body = {
      code: 0,
      data: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '更新失败'
    }
  }
})

router.post('/deleteHot', async (ctx, next) => {
  console.log(ctx.request.body)
  const _id = ctx.request.body._id
  const update = new Date()
  const result = await Item.updateOne({ _id }, { $set: { ishot: '0' } })
  if (result) {
    ctx.body = {
      code: 0,
      data: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '更新失败'
    }
  }
})

router.get('/getHots', async (ctx, next) => {
  let limit = ctx.query.limit ? ctx.query.limit : 6
  let category = ctx.query.category
    ? decodeURIComponent(ctx.query.category)
    : ''
  let hots = await Item.find({
    ishot: '1',
    category: {
      $regex: category ? category : ''
    }
  }).limit(limit)
  if (hots) {
    ctx.body = {
      code: 0,
      data: hots,
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
