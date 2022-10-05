import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema( {
  rating: {type: String, min: 0, max: 10},
  comment: String,
  smoothness: String,
  author: { type: Schema.Types.ObjectId, ref: "Profile" }

}, {
  timestamps: true
})

const bottleSchema = new Schema({
  title: String,
  distillery: String,
  spirit: String,
  size: Number,
  notes: String,
  type: {
    type: String, 
    match: /[bourbon, rye, wheated]\d?/
  },
  mash: String,
  proof: Number,
  strength: Boolean,
  color: String,
  hug: String,
  flavor: String,
  quantity: Number,
  collectable: Boolean,
  inventory: Boolean,
  wishes: Boolean,
  reviews: [reviewSchema],
  owner: { type: Schema.Types.ObjectId, ref: "Profile" }

}, {
  timestamps: true
})

const Bottle = mongoose.model('Bottle', bottleSchema)

export {
  Bottle
}
