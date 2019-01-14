import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Category from '../dbs/models/categorys'
//文件上传

let router = new Router({
  prefix: '/categorys'
})

router.post('/addCategory', async (ctx, next) => {
  console.log(ctx)
  const { categoryname, sort } = ctx.request.body
  let newCategory = await Category.create({
    categoryname,
    sort
  })
  if (newCategory) {
    ctx.body = {
      code: 0,
      data: categoryname
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '创建失败'
    }
  }
})

router.post('/deleteCategory', async (ctx, next) => {
  console.log(ctx)
  const _id = ctx.request.body._id
  const result = await Category.remove({
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

router.post('/deactiveCategory', async (ctx, next) => {
  console.log(ctx.request.body)
  const { _id, categoryname } = ctx.request.body
  const update = new Date()
  const active = 0
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
})

router.post('/activeCategory', async (ctx, next) => {
  console.log(ctx.request.body)
  const { _id, categoryname } = ctx.request.body
  const update = new Date()
  const active = 1
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

router.get('/getCategoryById', async (ctx, next) => {
  console.log(ctx)
  const id = ctx.query.categoryid
  let category = await Category.findOne({
    id
  })
  if (category) {
    ctx.body = {
      code: 0,
      data: category
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '数据获取失败'
    }
  }
})

export default router
