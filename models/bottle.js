import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bottleSchema = new Schema({
  title: String,
  distillery: String,
  size: Number,
  notes: String,
  type: Boolean,
  mash: Number,
  proof: Number,
  strength: Boolean,
  color: String,
  hug: String,
  flavor: String,
}, {
  timestamps: true
})

const Bottle = mongoose.model('Bottle', bottleSchema)

export {
  Bottle
}
