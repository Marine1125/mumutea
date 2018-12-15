import mongoose from 'mongoose'
const Schema = mongoose.Schema
const CategorySchema = new Schema({
  categoryname: {
    type: String,
    required: true
  },
  active: {
    type: String,
    required: true,
    default: '1'
  },
  create: {
    type: Date,
    default: Date.now
  },
  sort: {
    type: Number,
    required: true
  },
  update: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Category', CategorySchema)
