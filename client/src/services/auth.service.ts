import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL

const register = (username: string, email: string, password: string) => {
  // console.log('api url: ', API_URL)
  return axios.post(`${API_URL}/api/auth/register`, {
    username,
    email,
    password,
  })
}

const login = (email: string, password: string) => {
  return axios
    .post(`${API_URL}/api/auth/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
      }
      return response.data.user
    })
}

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
};

export default {
  register,
  login,
  logout
}