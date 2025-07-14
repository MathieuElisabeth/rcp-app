import Recipe from "../model/Recipe.js"
import User from "../model/User.js"
import { recipeValidation } from "../validation.js"
import mongoose from "mongoose"

export const create = (req, res) => {
  // Validate request
  const { error } = recipeValidation(req.body)
  if (error) return res.status(400).send({ message: error.details[0].message, field: error.details[0].context.label})
  // Create a Recipe
  const recipe = new Recipe({...req.body})

  // let recipeId
  // const userId = req.body.author.id
  // Save Recipe in the database
  recipe
    .save(recipe)
    .then(data => {
      // recipeId = recipe.data._id
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recipe."
      })
    })

    // User.findByIdAndUpdate(userId, { $push: { recipes : recipeId } })
    // .then(data => {
    //   res.send(data)
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while retrieving recipes."
    //   })
    // })
}


// Retrieve all Recipes from the database.
export const findAll = (req, res) => {
  const title = req.query.title
  const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {}
  Recipe.find(condition)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipes."
      })
    })
}

// Retrieve all user Recipes from the database.
export const findAllUserRecipe = (req, res) => {
  Recipe.find({ 'author.id': req.query.id })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipes."
      })
    })
}


// Retrieve all favorite Recipes from the database.
export const findAllFavorite = async (req, res) => {
  const user = await User.findOne({ _id:  mongoose.Types.ObjectId(req.query._id) })

  if (!user?.favorites)  res.status(400).send('No recipes in favorites')

  const recipesIDs = user.favorites.map(id =>  mongoose.Types.ObjectId(id))

  Recipe.find({ _id: { $in: recipesIDs } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipes."
      })
    })
}


// Find a single Recipe with an id
export const findOne = (req, res) => {
  const id = req.params.id
  Recipe.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found Recipe with id: ${id}` })
      else res.send(data)
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Recipe with id=${id}` })
    })
}


// Update a Recipe by the id in the request
export const update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    })
  }

  const { error } = recipeValidation(req.body.data)
  if (error) return res.status(400).send({ message: error.details[0].message, field: error.details[0].context.label})

  const id = req.body.id
  Recipe.findByIdAndUpdate(id,{ $set: req.body.data })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found!`
        })
      } else res.send({ message: "Recipe was updated successfully." })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Recipe with id=" + id
      })
    })
}


// Handle favorite
export const handleFavorite = async (req, res) => {
  const user = await User.findOne({ _id:  mongoose.Types.ObjectId(req.body.userId) })
  
  if (user.favorites.includes(req.body.recipeId)) {
    removeToFavorite(req, res)
  } else {
    addToFavorite(req, res)
  }
}
// Add to favorite a Recipe
const addToFavorite = (req, res) => {
  const recipeId = req.body.recipeId
  const userId = req.body.userId
  // const user = req.body.user

  User.updateOne(
    { _id: mongoose.Types.ObjectId(userId) },
    { $push: { favorites : recipeId } }
  )
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found Recipe with id: ${recipeId}` })
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Recipe with id=${recipeId}` })
    })

  Recipe.updateOne(
    { _id: mongoose.Types.ObjectId(recipeId) },
    { $inc: { likes : 1 } }
  )
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found Recipe with id: ${recipeId}` })
      else res.send({ message: "Recipe was liked successfully." })
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Recipe with id=${recipeId}` })
    })

  // Recipe.updateOne(
  //   { _id: mongoose.Types.ObjectId(recipeId) },
  //   { $push: { likes : user } }
  // )
  //   .then(data => {
  //     if (!data)
  //       res.status(404).send({ message: `Not found Recipe with id: ${recipeId}` })
  //     else res.send({ message: "Recipe was liked successfully." })
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .send({ message: `Error retrieving Recipe with id=${recipeId}` })
  //   })
}
// Remove to favorite a Recipe
const removeToFavorite = (req, res) => {
  const recipeId = req.body.recipeId
  const userId = req.body.userId
  // const user = req.body.user

  User.updateOne(
    { _id: mongoose.Types.ObjectId(userId) },
    { $pullAll: { favorites : [ recipeId ] } }
  )
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found Recipe with id: ${recipeId}` })
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Recipe with id=${recipeId}` })
    })

    Recipe.updateOne(
      { _id: mongoose.Types.ObjectId(recipeId) },
      { $inc: { likes : -1 } }
    )
      .then(data => {
        if (!data)
          res.status(404).send({ message: `Not found Recipe with id: ${recipeId}` })
        else res.send({ message: "Recipe was unliked successfully." })
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: `Error with like Recipe id=${recipeId}` })
      })

    // Recipe.updateOne(
    //   { _id: mongoose.Types.ObjectId(recipeId) },
    //   { $pullAll: { likes : [ user ] }
    // )
    //   .then(data => {
    //     if (!data)
    //       res.status(404).send({ message: `Not found Recipe with id: ${recipeId}` })
    //     else res.send({ message: "Recipe was unliked successfully." })
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .send({ message: `Error with like Recipe id=${recipeId}` })
    //   })
}


// Delete a Recipe with the specified id in the request
export const deleteOne = (req, res) => {
  const id = req.body.id
  // const userId = req.body.user
  Recipe.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
        })
      } else {
        res.send({
          message: "Recipe was deleted successfully!"
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Recipe with id=${id}`
      })
    })

    // User.findByIdAndUpdate(userId, { $pullAll: { recipes : [recipeId] } })
    // .then(data => {
    //   res.send(data)
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while retrieving recipes."
    //   })
    // })
}

export const comment = (req, res) => {
  const id = req.body.id

  const newComment = {
    author: req.body.author,
    text: req.body.text,
    date: req.body.date
  }

  Recipe.updateOne(
    { _id: mongoose.Types.ObjectId(id) },
    { $push: { comments : newComment } }
  )
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found Recipe with id: ${id}` })
      else res.send(data)
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Recipe with id=${id}` })
    })
}

export const mostLikedRecipe = async (req, res) => {

  Recipe.find()
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found Recipe with id: ${id}` })
      else {
        const mostliked = data.sort(
          function(a,b) {
              if (a.likes > b.likes) return -1
              if (a.likes < b.likes) return 1
              return 0
          }).slice(0, 8)
          res.send(mostliked)
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Recipe` })
    })
    // try {
    //     const variable = await Recipe.find()
    //         .sort(function(a,b) {
    //             if (a.likes > b.likes) return -1
    //             if (a.likes < b.likes) return 1
    //             return 0
    //         })
    //         .slice(0, 4)
    //     res.status(200).json(variable)
    // } catch (error) {
    //     res.status(500).json(error)
    // }
}

export const lastRecipes = (req, res) => {
  Recipe.find()
    .sort({createdAt: -1})
    .limit(5)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found Recipes` })
      else  res.send(data)
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Recipes` })
    })
}

// Rated Recipe
// export const rated = (req, res) => {
//   const recipe = await Recipe.findOne({ user: req.params.id })
//   const rating = await User.find({ rated_recipes:  req.params.id })

//   const updateRating = {
//     notes_number: req.body.notes_number + 1,
//     average: req.body.average
//   }

//   Recipe.findByIdAndUpdate(req.params.id, req.body)
//   .then(data => {
//     if (!data) {
//       res.status(404).send({
//         message: `Cannot update Recipe with id=${id}. Maybe Tutorial was not found!`
//       })
//     } else res.send({ message: "Tutorial was updated successfully." })
//   })
//   .catch(err => {
//     res.status(500).send({
//       message: "Error updating Tutorial with id=" + id
//     })
//   })

//   User.updateOne(
//     { _id: mongoose.Types.ObjectId(req.body._id) },
//     { $push: {  rated_recipes : [ id ] } }
//   )
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: `Not found Recipe with id: ${id}` })
//       else res.send(data)
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: `Error retrieving Recipe with id=${id}` })
//     })
// }
// Add comment
