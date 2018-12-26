import mongoose from 'mongoose'
const Schema = mongoose.Schema
const CollectionSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  itemid: {
    type: String,
    required: true
  },
  create: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Collection', CollectionSchema)
