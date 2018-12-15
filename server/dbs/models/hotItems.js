import mongoose from 'mongoose'
const Schema = mongoose.Schema
const HotItemSchema = new Schema({
  itemid: {
    type: String,
    required: true
  },
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
    type: String,
    required: true
  }
})

export default mongoose.model('HotItem', HotItemSchema)
