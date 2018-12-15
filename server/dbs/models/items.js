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
  }
})

export default mongoose.model('Item', ItemSchema)
