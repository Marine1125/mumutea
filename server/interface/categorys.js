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
  let categoryList = await Category.find().sort({ sort: 1 })
  if (categoryList) {
    ctx.body = {
      code: 0,
      data: categoryList
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
