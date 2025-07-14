import RecipeService from "../services/recipes.service";

export const create = (recipe: any) => (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  return RecipeService.createRecipe(recipe).then(
    () => {
      dispatch({ type: "CLEAR_MESSAGE" })
      return Promise.resolve()
    },
    (error: { response: { data: { message: string; field: string; }; }; }) => {
      console.log('error recipeService: ', error)
      const message = error.response.data.message || 'Une erreur est survenue.'
      const field = error.response.data.field || ''
      dispatch({
        type: "SET_MESSAGE",
        payload: { recipe: { message, field } },
      })
      return Promise.reject()
    }
  )
}

export const update = (recipe: any, id: string) => (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  return RecipeService.updateRecipe(recipe, id).then(
    () => {
      dispatch({ type: "CLEAR_MESSAGE" })
      return Promise.resolve()
    },
    (error: { response: { data: { message: string; field: string; }; }; }) => {
      const message = error.response.data.message || 'Une erreur est survenue.'
      const field = error.response.data.field || ''
      dispatch({
        type: "SET_MESSAGE",
        payload: { recipe: { message, field } },
      })
      return Promise.reject()
    }
  )
}