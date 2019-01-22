import Router from 'koa-router'
import Axios from 'axios'
import Reviews from '../dbs/models/reviews'

let router = new Router({
  prefix: '/reviews'
})

router.post('/addReview', async (ctx, next) => {
  if (ctx.session.passport && ctx.session.passport.user) {
    let reviewer = ctx.session.passport.user._id
    if (ctx.request.body.itemid && ctx.request.body.result) {
      const { reason, result, itemid } = ctx.request.body
      let newReview = await Reviews.create({
        reason,
        result,
        itemid,
        reviewer
      })
      if (newReview) {
        ctx.body = {
          code: 0,
          data: ''
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

router.get('/getReviewList', async (ctx, next) => {
  let results = {}
  let itemid = ctx.query.itemid ? ctx.query.itemid : ''
  let count = await Reviews.countDocuments({ itemid })
  if (count > 0) {
    results = await Reviews.find({ itemid })
      .sort({ create: -1 })
      .lean()
    for (let i = 0; i < results.length; i++) {
      results[i].create = new Date(results[i].create).toLocaleDateString()
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

export default router
