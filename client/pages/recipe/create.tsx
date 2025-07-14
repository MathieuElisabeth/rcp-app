import { NextPage } from "next"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { create } from "../../src/actions/recipe"
import Navbar from "../../src/components/Navbar"
import RecipeForm from "../../src/components/RecipeForm"
import useAuthentication from "../../src/lib/hook/useAuthentication"
import { useAppDispatch } from "../../store"
import { EditRecipePage } from "../../styles/GlobalStyles"

const Create: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth);
  const user = useSelector((state: { user: User }) => state.user)
  const alert = useSelector((state: { message: { register: { message: string, field: string } } }) => state.message)

  function createNewRecipe(data: RecipeProps) {
    const recipe = {
      ...data,
      author: {
        id: user._id,
        username: user.username
      }
    }
    dispatch(create(recipe))
      .then((res) => {
        router.push('/')
      })
      .catch((err) => {
        console.log('register alert: ', alert)
      })
  }


  useAuthentication()

  return (
    <>
      <Navbar />
      <EditRecipePage>
        <RecipeForm buttonName="Créer" submit={createNewRecipe} />
      </EditRecipePage>
    </>
  )
}

export default Create