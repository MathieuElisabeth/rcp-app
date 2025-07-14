import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  //   min: 6,
  //   max: 255
  // },
  username: {
    type: String,
    required: true,
    min: 4
  },
  email: {
    type: String,
    required: true,
    max: 255
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  favorites: {
    type: Array,
  },
  // recipes: {
  //   type: Array,
  // },
  rated_recipes: {
    type: Array,
    default: undefined
  }
})

const User = mongoose.model('User', userSchema)

export default User
