import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tips: {
    type: String,
    required: true
  },
  steps: {
    type: Array,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  create: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: String,
    required: true
  },
  label: {
    type: Array,
    required: true
  },
  ishot: {
    type: String,
    required: true,
    default: '0'
  },
  praise: {
    type: Number,
    required: true,
    default: 0
  },
  //审核状态：0：审核中，1：审核通过，-1：审核失败
  status: {
    type: String,
    required: true,
    default: 0
  }
})

export default mongoose.model('Item', ItemSchema)
