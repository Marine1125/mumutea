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
    type: String,
    required: true
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
  }
})

export default mongoose.model('User', UserSchema)
