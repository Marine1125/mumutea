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
  let labelList = await Label.find().sort({ sort: 1 })
  if (labelList) {
    ctx.body = {
      code: 0,
      data: labelList
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
