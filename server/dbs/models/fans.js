import mongoose from 'mongoose'
const Schema = mongoose.Schema
const FansSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  fansid: {
    type: String,
    required: true
  },
  fansname: {
    type: String,
    required: true
  },
  create: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Fans', FansSchema)
