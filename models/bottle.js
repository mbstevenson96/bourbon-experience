import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bottleSchema = new Schema({
  title: String,
  distillery: String,
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
  owner: { type: Schema.Types.ObjectId, ref: "Profile" }

}, {
  timestamps: true
})

const Bottle = mongoose.model('Bottle', bottleSchema)

export {
  Bottle
}
