import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  type: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  number_persons: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  preparation_time: {
    type: Number,
    required: true,
  },
  ingredients: [{
    name: String,
    quantity: String,
    unity: String
  }],
  steps: [{
    step_number: Number,
    description: String
  }],
  image: {
    type: String
  },
  author: {
    id: String,
    username: String,
  },
  comments: [
    {
        author: String,
        text: String,
        date: Date
    }
  ],
  likes : {
      type: Number,
      default: 0,
  },
  // likes : [
  //   {
  //       _id: String,
  //       author: String,
  //   }
  // ],
  // ratings : {
  //     notes_number: Number,
  //     average: Number,
  // }
},
{ timestamps: true }
)

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe