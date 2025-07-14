import RecipeService from "../services/recipes.service";
import userService from "../services/user.service";

export const likeRecipe = (data: object, favorites: any) => (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  return RecipeService.handleFavoriteRecipe(data).then(
    (res) => {
      dispatch({
        type: "HANDLE_LIKE",
        payload: favorites
      })
      dispatch({ type: "CLEAR_MESSAGE" })
      return Promise.resolve()
    },
    (error) => {
      console.log('Error like Recipe: ', error)
      Promise.reject()
    }

  )
}

export const updateUser = (data: any) => (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  return userService.updateUserInfo(data).then(
    (response: { data: { user: object } }) => {
      dispatch({
        type: "UPDATE_USER",
        payload: response.data.user
      })
      dispatch({ type: "CLEAR_MESSAGE" })
      localStorage.setItem("user", JSON.stringify(response.data.user))
      return Promise.resolve()
    },
    (error) => {
      const message = error.response.data.message || 'Une erreur est survenue.'
      const field = error.response.data.field || ''
      dispatch({
        type: "SET_MESSAGE",
        payload: { user: { message, field } },
      })
      Promise.reject()
    }

  )
}