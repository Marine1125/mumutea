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
  if (ctx.session.passport && ctx.session.passport.user) {
    const fansid = ctx.session.passport.user._id
    if (ctx.request.body.userid) {
      const userid = ctx.request.body.userid
      let isFollow = await Fans.countDocuments({
        fansid,
        userid
      })
      if (isFollow === 0) {
        let result = await Fans.create({
          fansid,
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

router.post('/deleteFollow', async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user) {
    const fansid = ctx.session.passport.user._id
    if (ctx.request.body.userid) {
      const userid = ctx.request.body.userid
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
    } else {
      ctx.body = {
        code: -1,
        msg: '参数为空'
      }
    }
  } else {
  }
})
router.get('/isFollow', async (ctx, next) => {
  const userid = ctx.query.userid ? ctx.query.userid : ''
  if (ctx.session.passport && ctx.session.passport.user) {
    const fansid = ctx.session.passport.user._id
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
  } else {
    ctx.body = {
      code: -2,
      msg: '用户未登录'
    }
  }
})

router.get('/getFansList', async (ctx, next) => {
  const userid = ctx.query.userid ? ctx.query.userid : ''
  const limit = parseInt(ctx.query.limit ? ctx.query.limit : 8)
  const offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  const count = await Fans.countDocuments({ userid })
    .limit(limit)
    .skip(offset)
  if (count > 0) {
    const fansList = await Fans.find({ userid })
      .limit(limit)
      .skip(offset)
    let fansArray = []
    fansList.forEach(item => {
      fansArray.push(item.fansid)
    })
    let results = await Users.find({ _id: { $in: fansArray } }).lean()
    if (results) {
      for (let i = 0; i < results.length; i++) {
        results[i].fanscount = await Fans.countDocuments({
          userid: results[i]._id
        })
        results[i].followscount = await Fans.countDocuments({
          fansid: results[i]._id
        })
        results[i].birthday = new Date(results[i].birthday).toLocaleDateString()
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
      code: -0,
      data: { count: 0, results: [] }
    }
  }
})

router.get('/getFollowList', async (ctx, next) => {
  const fansid = ctx.query.userid ? ctx.query.userid : ''
  const limit = parseInt(ctx.query.limit ? ctx.query.limit : 8)
  const offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  const count = await Fans.countDocuments({ fansid })
    .limit(limit)
    .skip(offset)
  if (count > 0) {
    let followList = await Fans.find({ fansid })
      .limit(limit)
      .skip(offset)
    let followArray = []
    followList.forEach(item => {
      followArray.push(item.userid)
    })
    let results = await Users.find({ _id: { $in: followArray } }).lean()
    if (results) {
      for (let i = 0; i < results.length; i++) {
        results[i].fanscount = await Fans.countDocuments({
          userid: results[i]._id
        })
        results[i].followscount = await Fans.countDocuments({
          fansid: results[i]._id
        })
        results[i].birthday = new Date(results[i].birthday).toLocaleDateString()
        ctx.body = {
          code: 0,
          data: { count, results }
        }
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

router.get('/getFansById', async (ctx, next) => {
  const _id = ctx.query._id ? ctx.query._id : ''
  let result = await Fans.findOne({
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
      msg: '数据获取失败'
    }
  }
})

export default router
