import axios from "axios"
import authHeader from "./auth-header"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const getUserRecipes = (id: unknown) => {
  return axios.get(`${API_URL}/api/recipe/user`, { headers: authHeader(), params: { id } })
}

const getUserFavoriteRecipes = (_id: string) => {
  return axios.get(`${API_URL}/api/recipe/favorite`, { headers: authHeader(), params: { _id } })
}

const updateUserInfo = (data: any) => {
  return axios.put(`${API_URL}/api/user`, data, { headers: authHeader() })
}

const deleteUser = (id: string) => {
  return axios.delete(`${API_URL}/api/user`, { data: { id }, headers: authHeader() })
}

export default {
  getUserRecipes,
  getUserFavoriteRecipes,
  updateUserInfo,
  deleteUser
}