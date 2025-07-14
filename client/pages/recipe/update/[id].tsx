import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { create, update } from "../../../src/actions/recipe"
import Navbar from "../../../src/components/Navbar"
import RecipeForm from "../../../src/components/RecipeForm"
import useAuthentication from "../../../src/lib/hook/useAuthentication"
import recipesService from "../../../src/services/recipes.service"
import { useAppDispatch } from "../../../store"
import { EditRecipePage } from "../../../styles/GlobalStyles"

const Update = ({ data }: { data: any }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth);
  const alert = useSelector((state: { message: { register: { message: string, field: string } } }) => state.message)

  useAuthentication()

  function updateRecipe(recipe: RecipeProps) {
    dispatch(update(recipe, data._id))
      .then((res) => {
        router.push('/')
      })
      .catch((err) => {
        console.log('register alert: ', alert)
      })
  }

  return (
    <>
      <Navbar />
      <EditRecipePage>
        <RecipeForm {...data} buttonName="Sauvegarder" submit={updateRecipe} />
      </EditRecipePage>
    </>
  )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await recipesService.getRecipe(params.id)
  const data = res.data

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }
  }
}

export default Update