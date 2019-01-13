import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Fans from '../dbs/models/fans'
import Passport from '../utils/passport'
import Email from '../dbs/config'
import Axios from 'axios'

let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client

router.post('/signup', async ctx => {
  const { username, password, email, code } = ctx.request.body
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码超时，请重新发送验证码'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '验证码错误，请重新输入'
      }
      return false
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '验证码不能为空，请输入验证码'
    }
    return false
  }
  let user = await User.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户名已存在，可不可以换一个呢'
    }
    return
  }
  let newuser = await User.create({
    username,
    password,
    email
  })
  if (newuser) {
    let result = await Axios.post('http://localhost:3000/users/signin', {
      username,
      password
    })

    if (result.data && result.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: 'sign up ok',
        user: result.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'sign up not ok!'
    }
  }
})

router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功'
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '请求过于频繁'
    }
    return false
  }
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: Email.smtp.port,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  let mailOption = {
    from: `"认证邮件"<${Email.smtp.user}>`,
    to: ko.email,
    subject: '注册码',
    html: `注册码是${ko.code}`
  }
  await transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      return console.log('send mail error:' + error)
    } else {
      Store.hset(`nodemail:${ko.user}`, 'code', ko.code)
      Store.hset(`nodemail:${ko.user}`, 'expire', ko.expire)
      Store.hset(`nodemail:${ko.user}`, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，请耐心等待'
  }
})
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
      msg: '注销成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注销失败'
    }
  }
})

router.get('/getLoginUser', async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    const result = ctx.session.passport.user
    ctx.body = {
      code: 0,
      data: result
    }
  } else {
    ctx.body = {
      code: -1,
      data: '',
      msg: '用户未登录'
    }
  }
})

router.get('/getUserByName', async ctx => {
  let username = ctx.query.username
  let where = {
    username
  }
  let result = await User.findOne(where)
  if (result) {
    ctx.body = {
      code: 0,
      msg: '',
      data: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '',
      data: ''
    }
  }
})
router.get('/getUserByEmail', async ctx => {
  let email = ctx.query.email
  let where = {
    email
  }
  let result = await User.findOne(where)
  if (result) {
    ctx.body = {
      code: 0,
      msg: '',
      data: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '',
      data: ''
    }
  }
})

router.get('/getUserById', async ctx => {
  let _id = ctx.query._id
  let where = {
    _id
  }
  let fans = await Fans.countDocuments({
    userid: _id
  })
  let follows = await Fans.countDocuments({
    fansid: _id
  })
  let result = await User.findOne(where).lean()
  result.fans = fans
  result.follows = follows
  result.birthday = new Date(result.birthday).toLocaleDateString()
  if (result) {
    ctx.body = {
      code: 0,
      msg: '',
      data: result
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '',
      data: ''
    }
  }
})

router.post('/userUpdate', async ctx => {
  const {
    _id,
    photo,
    province,
    city,
    birthday,
    constellation,
    sex,
    introduce
  } = ctx.request.body
  const result = await User.updateOne(
    { _id },
    {
      $set: {
        photo,
        province,
        city,
        birthday,
        constellation,
        sex,
        introduce
      }
    }
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

router.get('/getUserList', async ctx => {
  let limit = parseInt(ctx.query.limit ? ctx.query.limit : 20)
  let offset = parseInt(ctx.query.offset ? ctx.query.offset : 0)
  let username = ctx.query.username ? ctx.query.username : ''
  let results = await User.find({ username: { $regex: username } })
    .limit(limit)
    .skip(offset)
  if (results.length > 0) {
    ctx.body = {
      code: 0,
      msg: '',
      data: results
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '获取数据失败',
      data: ''
    }
  }
})
router.post('/updateRole', async ctx => {
  const { _id, role } = ctx.request.body
  const result = await User.updateOne(
    { _id },
    {
      $set: {
        role
      }
    }
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

export default router
