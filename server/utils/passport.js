import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../dbs/models/users'
import Fans from '../dbs/models/fans'

passport.use(
  new LocalStrategy(async (username, password, done) => {
    let where = {
      username
    }
    let result = await UserModel.findOne(where).lean()

    if (result != null) {
      if (result.password === password) {
        result.fans = await Fans.countDocuments({
          userid: result._id
        })
        result.follows = await Fans.countDocuments({
          fansid: result._id
        })
        result.birthday = new Date(result.birthday).toLocaleDateString()
        return done(null, result)
      } else {
        return done(null, false, 'password is wrong!')
      }
    } else {
      return done(null, false, 'user not exist!')
    }
  })
)
//序列化
passport.serializeUser(function(user, done) {
  done(null, user)
})
//反序列化
passport.deserializeUser(function(user, done) {
  done(null, user)
})

export default passport
