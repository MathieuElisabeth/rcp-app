import express from 'express'
import {
  comment,
  create,
  deleteOne,
  findAll,
  findAllFavorite,
  findAllUserRecipe,
  findOne,
  handleFavorite,
  lastRecipes,
  mostLikedRecipe,
  // rated,
  update 
} from '../controllers/recipes.controller.js';
import verify from './verifyToken.js'

const router = express.Router()

router.post("/", verify, create);
// Retrieve all Recipes
router.get("/", findAll);
// Update a Recipe with id
router.put("/", verify, update);
// Delete a Recipe with id
router.delete("/", verify, deleteOne);
// Retrieve all User Recipes
router.get("/user", verify, findAllUserRecipe);
// Retrieve all favorite Recipes
router.get("/favorite", verify, findAllFavorite);
// Add a Recipe to favorite
router.put("/favorite", verify, handleFavorite);
// Retrieve most liked Recipes
router.get("/mostliked", mostLikedRecipe);
// Retrieve most recent Recipes
router.get("/lastrecipes", lastRecipes);
// Add comments
router.post("/comment", verify, comment);
// Retrieve a single Recipe with id
router.get("/:id", findOne);
// Rated a Recipe
// router.put("/rated/:id", verify, rated);

export default router