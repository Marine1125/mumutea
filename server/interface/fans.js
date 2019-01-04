import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块
import Fans from '../dbs/models/fans'
import Users from '../dbs/models/users'
//文件上传

let router = new Router({
  prefix: '/fans'
})

router.post('/addFollow', async (ctx, next) => {
  console.log(ctx.request.body)
  const userid = ctx.request.body.userid
  const fansid = ctx.session.passport.user._id
  let isFollow = await Fans.countDocuments({
    fansid,
    userid
  })
  if (isFollow == 0) {
    let result = await Fans.create({
      fansid,
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

router.post('/deleteFollow', async (ctx, next) => {
  console.log(ctx.request.body)
  const userid = ctx.request.body.userid
  const fansid = ctx.session.passport.user._id
  const result = await Fans.remove({
    userid,
    fansid
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
router.get('/isFollow', async (ctx, next) => {
  const userid = ctx.query.userid
  let fansid = ''
  if (!ctx.session.passport.user) {
    ctx.body = {
      code: -1,
      msg: '未登录'
    }
    return
  }
  fansid = ctx.session.passport.user._id
  let result = await Fans.findOne({
    userid,
    fansid
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

router.get('/getFansList', async (ctx, next) => {
  const userid = ctx.query.userid
  const limit = parseInt(ctx.query.limit ? ctx.query.limit : 8)
  const offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  let fansList = await Fans.find({ userid })
    .limit(limit)
    .skip(offset)
  let fansArray = []
  fansList.forEach(item => {
    fansArray.push(item.fansid)
  })
  let results = await Users.find({ _id: { $in: fansArray } })
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

router.get('/getFollowList', async (ctx, next) => {
  const fansid = ctx.query.userid
  const limit = parseInt(ctx.query.limit ? ctx.query.limit : 8)
  const offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  let followList = await Fans.find({ fansid })
    .limit(limit)
    .skip(offset)
  let followArray = []
  followList.forEach(item => {
    followArray.push(item.userid)
  })
  let results = await Users.find({ _id: { $in: followArray } })
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

router.get('/getFansById', async (ctx, next) => {
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
