import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  create: {
    type: Date,
    default: Date.now
  },
  birthday: {
    type: Date
  },
  introduce: {
    type: String,
    default: '这个博主很懒，什么都没留下'
  },
  sex: {
    type: String
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  constellation: {
    type: String
  },
  //角色 0:nomal;1:admin
  role: {
    type: String,
    required: true,
    default: 0
  }
})

export default mongoose.model('User', UserSchema)
