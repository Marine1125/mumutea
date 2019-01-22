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
  if (ctx.session.passport && ctx.session.passport.user) {
    const userid = ctx.session.passport.user._id
    if (ctx.request.body.itemid) {
      const itemid = ctx.request.body.itemid
      let count = await Collection.countDocuments({
        itemid,
        userid
      })
      if (count === 0) {
        let result = await Collection.create({
          itemid,
          userid
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
          code: 0,
          msg: '数据已存在'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '食谱不能为空'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '用户未登录'
    }
  }
})

router.post('/deleteCollection', async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user) {
    const userid = ctx.session.passport.user._id
    if (ctx.request.body.itemid) {
      const itemid = ctx.request.body.itemid
      let count = await Collection.countDocuments({
        itemid,
        userid
      })
      if (count === 0) {
        const result = await Collection.remove({
          userid,
          itemid
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
          code: 0,
          msg: '数据不存在，未删除'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '食谱不能为空'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '用户未登录'
    }
  }
})

router.get('/getCollectionList', async (ctx, next) => {
  const userid = ctx.query.userid ? ctx.query.userid : ''
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
    results[i].create = new Date(results[i].create).toLocaleDateString()
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
