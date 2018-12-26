import mongoose from 'mongoose'
const Schema = mongoose.Schema
const DraftSchema = new Schema({
  title: {
    type: String
  },
  summary: {
    type: String
  },
  filename: {
    type: String
  },
  category: {
    type: String
  },
  tips: {
    type: String
  },
  steps: {
    type: Array
  },
  ingredients: {
    type: Array
  },
  create: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: String
  },
  label: {
    type: Array
  }
})

export default mongoose.model('Draft', DraftSchema)
