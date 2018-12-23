import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Fans from '../dbs/models/fans'
//文件上传

let router = new Router({
  prefix: '/fans'
})

router.post('/addFollow', async (ctx, next) => {
  console.log(ctx)
  const { labelname, sort } = ctx.request.body
  let newLabel = await Fans.create({
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

router.post('/deleteFollow', async (ctx, next) => {
  console.log(ctx)
  const _id = ctx.request.body._id
  const result = await Fans.remove({
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

router.get('/getFansList', async (ctx, next) => {
  let labelList = await Fans.find().sort({ sort: 1 })
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

router.get('/getFansById', async (ctx, next) => {
  console.log(ctx)
  const _id = ctx.query._id
  let label = await Fans.findOne({
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
