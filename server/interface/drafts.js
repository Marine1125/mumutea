import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Draft from '../dbs/models/drafts'
//文件上传

let router = new Router({
  prefix: '/drafts'
})

router.post('/addDraft', async (ctx, next) => {
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
  let result = await Draft.create({
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
  if (result) {
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

router.post('/updateDraft', async (ctx, next) => {
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
  let result = await Draft.updateOne(
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

router.get('/getDraftList', async (ctx, next) => {
  const creator = ctx.query.userid
  const limit = parseInt(ctx.query.limit ? ctx.query.limit : 8)
  const offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  let results = await Draft.find({ creator })
    .limit(limit)
    .skip(offset)

  if (results) {
    ctx.body = {
      code: 0,
      data: results
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '数据获取失败'
    }
  }
})

router.get('/getDraftById', async (ctx, next) => {
  console.log('123')
  let _id = ctx.query._id
  let result = await Draft.findOne({
    _id
  })
  if (result) {
    ctx.body = {
      code: 0,
      data: result,
      msg: ''
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'data not exist'
    }
  }
})

router.post('/deleteDraft', async (ctx, next) => {
  console.log(ctx.request.body)
  const _id = ctx.request.body._id
  const result = await Draft.remove({
    _id
  })
  if (result) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '删除失败'
    }
  }
})

export default router
