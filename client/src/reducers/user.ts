let user
if (typeof window !== 'undefined') {
  const userStorage = localStorage.getItem("user")
  if (userStorage) user = JSON.parse(userStorage)
}
const initialState = user ? { ...user } : {}

export default function userReducer(state: any = initialState, action: { type: string; payload: any; }) {
  const { type, payload } = action
  switch (type) {
    case "SET_USER":
      return payload
    case "UPDATE_USER":
      return {
        ...state,
        ...payload
      }
    case "HANDLE_LIKE":
      const updatedFavorites = payload
      return {
        ...state,
        favorites: updatedFavorites
      }
      break
    default:
      return state
  }
}