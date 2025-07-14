let user
if (typeof window !== 'undefined') {
  const userStorage = localStorage.getItem("user")
  if (userStorage) user = JSON.parse(userStorage)
}
const initialState = user
  ? { isLoggedIn: true }
  : { isLoggedIn: false };


export default function authReducer(state = initialState, action: { type: string; payload: any; }) {
  const { type, payload } = action
  switch (type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoggedIn: false,
      }
    case "REGISTER_FAIL":
      return {
        ...state,
        isLoggedIn: false,
      }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
      }
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoggedIn: false,
      }
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
      }
    default:
      return state
  }
}