import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ReviewSchema = new Schema({
  reason: {
    type: String,
    required: true,
    default: '审核通过'
  },
  itemid: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  create: {
    type: Date,
    default: Date.now
  },
  reviewer: {
    type: String,
    required: true
  }
})

export default mongoose.model('Review', ReviewSchema)
