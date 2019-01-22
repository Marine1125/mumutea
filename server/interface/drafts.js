import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Draft from '../dbs/models/drafts'
//文件上传

let router = new Router({
  prefix: '/drafts'
})

router.post('/addDraft', async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user) {
    const creator = ctx.session.passport.user._id
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
    const result = await Draft.create({
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
        msg: '创建成功'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '创建失败'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '用户未登录'
    }
  }
})

router.post('/updateDraft', async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user) {
    const creator = ctx.session.passport.user._id
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
    const result = await Draft.updateOne(
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
        msg: '更新成功'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '更新失败'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '用户未登录'
    }
  }
})

router.get('/getDraftList', async (ctx, next) => {
  const creator = ctx.query.userid ? ctx.query.userid : ''
  const limit = parseInt(ctx.query.limit ? ctx.query.limit : 8)
  const offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  const count = await Draft.countDocuments({ creator })
    .limit(limit)
    .skip(offset)
  if (count > 0) {
    const results = await Draft.find({ creator })
      .limit(limit)
      .skip(offset)
    if (results) {
      ctx.body = {
        code: 0,
        data: { count, results }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '数据获取失败'
      }
    }
  } else {
    ctx.body = {
      code: 0,
      data: { count: 0, results: [] }
    }
  }
})

router.get('/getDraftById', async (ctx, next) => {
  if (ctx.query._id) {
    const _id = ctx.query._id
    const result = await Draft.findOne({
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
        msg: '数据不存在'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '参数为空'
    }
  }
})

router.post('/deleteDraft', async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user) {
    if (ctx.request.body._id) {
      const _id = ctx.request.body._id
      const result = await Draft.remove({
        _id
      })
      if (result) {
        ctx.body = {
          code: 0,
          msg: '删除成功'
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '删除失败'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '参数为空'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '用户未登录'
    }
  }
})

export default router
