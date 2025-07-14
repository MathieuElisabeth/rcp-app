import axios from "axios"
import authHeader from "./auth-header"
const API_URL = process.env.NEXT_PUBLIC_API_URL

const createRecipe = (data: object) => {
  return axios.post(`${API_URL}/api/recipe`, data, { headers: authHeader() })
}

const getRecipeSearch = (search?: string) => {
  return axios.get(`${API_URL}/api/recipe?title=${search ?? ''}`)
}

const getRecipe = (id: string) => {
  return axios.get(`${API_URL}/api/recipe/${id}`)
}

const updateRecipe = (data: object, id: string) => {
  return axios.put(`${API_URL}/api/recipe`, { id, data }, { headers: authHeader() })
}

// const deleteRecipe = (id: string, userId) => {
const deleteRecipe = (id: string) => {
  // return axios.delete(`${API_URL}/api/recipe`, { data: { id, userId }, headers: authHeader() })
  return axios.delete(`${API_URL}/api/recipe`, { data: { id }, headers: authHeader() })
}

const handleFavoriteRecipe = (data: object) => {
  return axios.put(`${API_URL}/api/recipe/favorite`, data, { headers: authHeader() })
}

const addNewComment = (data: object) => {
  return axios.post(`${API_URL}/api/recipe/comment`, data, { headers: authHeader() })
}

const getMostLikedRecipes = () => {
  return axios.get(`${API_URL}/api/recipe/mostliked`)
}

const getLastRecipes = () => {
  return axios.get(`${API_URL}/api/recipe/lastrecipes`)
}

export default {
  createRecipe,
  getRecipeSearch,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  handleFavoriteRecipe,
  addNewComment,
  getMostLikedRecipes,
  getLastRecipes
}