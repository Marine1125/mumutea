import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Collection from '../dbs/models/collections'
import Item from '../dbs/models/items'
//文件上传

let router = new Router({
  prefix: '/collections'
})
router.post('/addCollection', async (ctx, next) => {
  console.log(ctx.request.body)
  const itemid = ctx.request.body.itemid
  const userid = ctx.session.passport.user._id
  let count = await Collection.countDocuments({
    itemid,
    userid
  })
  if (count == 0) {
    let result = await Collection.create({
      itemid,
      userid
    })
    if (result) {
      ctx.body = {
        code: 0
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '创建失败'
      }
    }
  } else {
    ctx.body = {
      code: 0
    }
  }
})

router.post('/deleteCollection', async (ctx, next) => {
  console.log(ctx.request.body)
  const itemid = ctx.request.body.itemid
  const userid = ctx.session.passport.user._id
  const result = await Collection.remove({
    userid,
    itemid
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

router.get('/getCollectionList', async (ctx, next) => {
  const userid = ctx.query.userid
  const limit = parseInt(ctx.query.limit ? ctx.query.limit : 8)
  const offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  let collectionList = await Collection.find({ userid })
    .limit(limit)
    .skip(offset)
  let collctionArray = []

  collectionList.forEach(item => {
    collctionArray.push(item.itemid)
  })
  let results = await Item.find({ _id: { $in: collctionArray } }).lean()
  for (let i = 0; i < results.length; i++) {
    let itemid = results[i]._id
    results[i].collectioncount = await Collection.countDocuments({
      itemid
    })
  }
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

export default router
