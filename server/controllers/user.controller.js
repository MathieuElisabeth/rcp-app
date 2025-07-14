import Recipe from "../model/Recipe.js"
import User from "../model/User.js"

// Get all users
export const findAll = (req, res) => {
  User.find({})
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

export const findOne = (req, res) => {
  const id = req.params.id
  User.findById(id)
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

export const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    })
  }


  if (req.body.user?.username) {
    const isUserExist = await User.findOne({ username: req.body.user.username })
    if (isUserExist) return res.status(400).send({ message: 'Ce pseudo est déjà utilisé', field: 'username'})
  }

  const id = req.body.id
  User.findByIdAndUpdate(id, req.body.user, { new: true })
    .then(user => {
      if (!user) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        })
      } else res.send({ user, message: "User was updated successfully." })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      })
    })
}

// Delete a User
export const deleteUser = (req, res) => {
  const id = req.body.id
  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User. Maybe User was not found!`
        })
      } else {
        res.send({
          message: "User was deleted successfully!"
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete User`
      })
    })

    Recipe.deleteMany({ 'author.id': id })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Recipes`
        })
      } else {
        res.send({
          message: "All user Recipe was deleted successfully!"
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete user Recipe`
      })
    })
}