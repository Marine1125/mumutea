import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Category from '../dbs/models/categorys'
//文件上传

let router = new Router({
  prefix: '/categorys'
})

router.post('/addCategory', async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user) {
    const { categoryname, sort } = ctx.request.body
    if (categoryname && sort) {
      const count = await Category.countDocuments({
        categoryname
      })
      if (count === 0) {
        const result = await Category.create({
          categoryname,
          sort
        })
        if (result) {
          ctx.body = {
            code: 0,
            data: result,
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
          code: -1,
          msg: '数据已存在'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '字段为空'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '用户未登录'
    }
  }
})

router.post('/deleteCategory', async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user) {
    if (ctx.request.body._id) {
      const _id = ctx.request.body._id
      const result = await Category.remove({
        _id
      })
      if (result) {
        ctx.body = {
          code: 0,
          data: result,
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
        msg: '字段为空'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '用户为登录'
    }
  }
})

router.post('/updateCategory', async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user) {
    if (
      ctx.request.body._id &&
      ctx.request.body.categoryname &&
      ctx.request.body._id.active
    ) {
      const { _id, categoryname, active } = ctx.request.body
      const update = new Date()
      const result = await Category.updateOne(
        { _id },
        { $set: { categoryname: categoryname, update: update, active: active } }
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
    } else {
      ctx.body = {
        code: -1,
        msg: '字段为空'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '用户未登录'
    }
  }
})

router.get('/getCategoryList', async (ctx, next) => {
  let results = {}
  let limit = parseInt(ctx.query.limit ? ctx.query.limit : 20)
  let offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  let categoryname = ctx.query.categoryname ? ctx.query.categoryname : ''
  let active = ctx.query.active ? ctx.query.active : ''
  let count = await Category.countDocuments({
    categoryname: { $regex: categoryname },
    active: { $regex: active }
  })
  if (count > 0) {
    results = await Category.find({
      categoryname: { $regex: categoryname },
      active: { $regex: active }
    })
      .sort({ sort: 1 })
      .limit(limit)
      .skip(offset)
      .lean()
    if (results) {
      for (let i = 0; i < results.length; i++) {
        results[i].create = new Date(results[i].create).toLocaleDateString()
        results[i].update = new Date(results[i].update).toLocaleDateString()
      }
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
      code: -1,
      msg: '没有数据',
      data: { count: 0, results: [] }
    }
  }
})

router.get('/getCategory', async (ctx, next) => {
  const _id = ctx.query._id ? ctx.query._id : ''
  let categoryname = ctx.query.categoryname ? ctx.query.categoryname : ''
  let result = await Category.findOne({
    categoryname: { $regex: categoryname },
    _id: _id
  })
  if (result) {
    ctx.body = {
      code: 0,
      data: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '数据获取失败'
    }
  }
})

export default router
