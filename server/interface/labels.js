import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Label from '../dbs/models/labels'
//文件上传

let router = new Router({
  prefix: '/labels'
})

router.post('/addLabel', async (ctx, next) => {
  console.log(ctx)
  const { labelname, sort } = ctx.request.body
  let newLabel = await Label.create({
    labelname,
    sort
  })
  if (newLabel) {
    ctx.body = {
      code: 0,
      data: labelname
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '创建失败'
    }
  }
})

router.post('/deleteLabel', async (ctx, next) => {
  console.log(ctx)
  const _id = ctx.request.body._id
  const result = await Label.remove({
    _id
  })
  if (result) {
    ctx.body = {
      code: 0,
      data: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '删除失败'
    }
  }
})

router.post('/deactiveLabel', async (ctx, next) => {
  console.log(ctx.request.body)
  const { _id, labelname } = ctx.request.body
  const update = new Date()
  const active = 0
  const result = await Label.updateOne(
    { _id },
    { $set: { labelname: labelname, update: update, active: active } }
  )
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

router.post('/activeLabel', async (ctx, next) => {
  console.log(ctx.request.body)
  const { _id, labelname } = ctx.request.body
  const update = new Date()
  const active = 1
  const result = await Label.updateOne(
    { _id },
    { $set: { labelname: labelname, update: update, active: active } }
  )
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

router.get('/getLabelList', async (ctx, next) => {
  let results = {}
  let limit = parseInt(ctx.query.limit ? ctx.query.limit : 20)
  let offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  let labelname = ctx.query.labelname ? ctx.query.labelname : ''
  let active = ctx.query.active ? ctx.query.active : ''
  let count = await Label.countDocuments({
    labelname: { $regex: labelname },
    active: { $regex: active }
  })
  if (count > 0) {
    results = await Label.find({
      labelname: { $regex: labelname },
      active: { $regex: active }
    })
      .sort({ sort: 1 })
      .limit(limit)
      .skip(offset)
      .lean()
    for (let i = 0; i < results.length; i++) {
      results[i].create = new Date(results[i].create).toLocaleDateString()
      results[i].update = new Date(results[i].update).toLocaleDateString()
    }
  }

  if (results.length > 0) {
    ctx.body = {
      code: 0,
      data: {
        count,
        results
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '数据获取失败'
    }
  }
})

router.get('/getLabelById', async (ctx, next) => {
  console.log(ctx)
  const _id = ctx.query._id
  let label = await Label.findOne({
    _id
  })
  if (label) {
    ctx.body = {
      code: 0,
      data: label
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '数据获取失败'
    }
  }
})

export default router
