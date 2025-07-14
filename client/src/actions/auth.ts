import AuthService from "../services/auth.service"

export const register = (username: string, email: string, password: string) => (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  return AuthService.register(username, email, password).then(
    (response: { data: { message: string } }) => {
      dispatch({
        type: "REGISTER_SUCCESS",
      })

      dispatch({ type: "CLEAR_MESSAGE" })
      return Promise.resolve()
    },
    (error) => {
      const message = error.response.data.message || 'Une erreur est survenue.'
      const field = error.response.data.field || ''
      dispatch({
        type: "REGISTER_FAIL",
      })
      dispatch({
        type: "SET_MESSAGE",
        payload: { register: { message, field } },
      })
      return Promise.reject()
    }
  )
}

export const login = (email: string, password: string) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  return AuthService.login(email, password).then(
    (user: any) => {
      dispatch({ type: "LOGIN_SUCCESS" })
      dispatch({
        type: "SET_USER",
        payload: user,
      })
      dispatch({ type: "CLEAR_MESSAGE" })
      localStorage.setItem("user", JSON.stringify(user))

      return Promise.resolve()
    },
    (error: { response: { data: { message: string, field: string } }; message: string; toString: () => any }) => {
      const message = error.response.data.message || 'Une erreur est survenue.'
      const field = error.response.data.field || ''
      dispatch({
        type: "LOGIN_FAIL",
      })
      dispatch({
        type: "SET_MESSAGE",
        payload: { login: { message, field } },
      })
      return Promise.reject()
    }
  )
}

export const logout = () => (dispatch: any) => {
  AuthService.logout()
  dispatch({ type: "LOGOUT" })
  dispatch({
    type: "SET_USER",
    payload: {},
  })
}