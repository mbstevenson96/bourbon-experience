import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  bottles: [{ type: Schema.Types.ObjectId, ref: "Bottle" }],
  wishes: [{ type: Schema.Types.ObjectId, ref: "Wish" }],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
