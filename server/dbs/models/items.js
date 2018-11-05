import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ItemSchema = new Schema({
  title: {
    type: String,
    //unique: true,
    required: true
  },
  filename: {
    type: String,
    //unique: true,
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
  }
})

export default mongoose.model('Item', ItemSchema)
