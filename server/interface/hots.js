import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Item from '../dbs/models/items'
import Collection from '../dbs/models/collections'
import User from '../dbs/models/users'
//文件上传

let router = new Router({
  prefix: '/hots'
})

router.post('/addHot', async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user) {
    if (ctx.request.body._id) {
      const _id = ctx.request.body._id
      const update = new Date()
      const result = await Item.updateOne({ _id }, { $set: { ishot: '1' } })
      if (result) {
        ctx.body = {
          code: 0,
          data: result,
          msg: '更新成功'
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '更新失败'
        }
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '用户未登录'
    }
  }
})

router.post('/deleteHot', async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user) {
    if (ctx.request.body._id) {
      const _id = ctx.request.body._id
      const update = new Date()
      const result = await Item.updateOne({ _id }, { $set: { ishot: '0' } })
      if (result) {
        ctx.body = {
          code: 0,
          data: result,
          msg: '更新成功'
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '更新失败'
        }
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '用户未登录'
    }
  }
})

router.get('/getHots', async (ctx, next) => {
  let limit = ctx.query.limit ? ctx.query.limit : 4
  let status = ctx.query.status ? ctx.query.status : '1'
  let category = ctx.query.category ? ctx.query.category : ''
  const count = await Item.countDocuments({
    ishot: '1',
    status: status,
    category: {
      $regex: category ? category : ''
    }
  }).limit(limit)
  if (count > 0) {
    let results = await Item.find({
      ishot: '1',
      status: status,
      category: {
        $regex: category ? category : ''
      }
    })
      .limit(limit)
      .lean()
    for (let i = 0; i < results.length; i++) {
      let itemid = results[i]._id
      let userid = results[i].creator
      results[i].collectioncount = await Collection.countDocuments({
        itemid
      })
      results[i].creatorinfo = await User.findOne({
        _id: userid
      })
      results[i].create = new Date(results[i].create).toLocaleDateString()
    }
    ctx.body = {
      code: 0,
      data: { count, results }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '未获取到数据',
      data: { count: 0, results: [] }
    }
  }
})

export default router
