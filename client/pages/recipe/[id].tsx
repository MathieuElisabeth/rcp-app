import { Favorite, FavoriteBorder } from "@mui/icons-material"
import { Divider, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import _ from "lodash"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { GetStaticPaths } from "next/types"
import { Fragment, SetStateAction, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { likeRecipe } from "../../src/actions/user"
import Navbar from "../../src/components/Navbar"
import { DEFAULT_RECIPE_IMAGE } from "../../src/lib/constants"
import { converteBase64toURL, convertMinuteToHour, formatDate } from "../../src/lib/utils"
import RecipeService from "../../src/services/recipes.service"
import { useAppDispatch } from "../../store"
import { ActionButton, InputForm, RecipeContainer, RecipePage } from "../../styles/GlobalStyles"
import {
  Comment,
  CommentInput,
  CommentsSection,
  CommentTitle,
  IngredientContainer,
  IngredientItem,
  RecipeHeader,
  RecipeHeaderOverlay,
  RecipeInfo,
  RecipePaper,
  RecipePreparationContainer,
  RecipeTitle,
  StepContainer,
  StepItem
} from "../../styles/Recipe.style"

// : InferGetServerSidePropsType<typeof getServerSideProps>

const Recipe = ({ data }: { data: RecipeProps }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth);
  const user = useSelector((state: { user: User }) => state.user)
  const [isMounted, setIsMounted] = useState(false)
  const [imageURL, setImageURL] = useState(DEFAULT_RECIPE_IMAGE)
  const [recipe, setRecipe] = useState(data)
  const [comment, setComment] = useState('')

  useEffect(() => setIsMounted(true), [])

  useEffect(() => {
    if (!recipe?.image) {
      setImageURL(DEFAULT_RECIPE_IMAGE)
      return
    }

    converteBase64toURL(recipe?.image, setImageURL)
  }, [recipe?.image])

  function addComment() {
    if (comment.trim() === '') return
    const commentsClone = recipe.comments
    const newComment: any = {
      id: recipe._id,
      author: user.username,
      text: comment,
      date: Date.now()
    }
    commentsClone.push(newComment)
    setRecipe({ ...data, comments: commentsClone })
    RecipeService.addNewComment(newComment)
    setComment('')
  }

  function handleLike() {
    if (!auth.isLoggedIn) return router.push('/login')
    const favoritesClone = [...user.favorites]
    const data = {
      userId: user._id,
      recipeId: recipe._id
    }

    if (_.includes(favoritesClone, recipe._id)) {
      _.pull(favoritesClone, recipe._id)
      setRecipe({ ...recipe, likes: recipe.likes - 1 })
    } else {
      favoritesClone.push(recipe._id)
      setRecipe({ ...recipe, likes: recipe.likes + 1 })
    }
    dispatch(likeRecipe(data, favoritesClone))
  }

  function handleChange(evt: { target: { value: SetStateAction<string> } }) {
    setComment(evt.target.value);
  }

  return (
    <RecipePage>
      <Navbar />
      <RecipeContainer>
        <RecipePaper>
          <RecipeHeader>
            <img src={imageURL} alt="image de la recette" />
            <RecipeTitle>
              {recipe.title}
            </RecipeTitle>
            <RecipeHeaderOverlay />
          </RecipeHeader>
          <RecipeInfo>
            <div className="likes-comments">
              <span>
                {recipe.likes}
                <IconButton onClick={handleLike} disabled={isMounted && !auth.isLoggedIn}>
                  {
                    (isMounted && auth.isLoggedIn && _.some(user.favorites, { _id: recipe._id })) ? (
                      <Favorite style={{ color: 'red' }} />
                    ) : <FavoriteBorder />
                  }
                </IconButton>
              </span>
              <span>
                <Link href="#comment-section">
                  <a>
                    {recipe.comments.length}
                    {" "}
                    commentaires
                  </a>
                </Link>
              </span>
            </div>
            <div className="recipe-properties">
              <div className="main-info">
                <span>Préparation</span>
                <p>{convertMinuteToHour(recipe.preparation_time)}</p>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="main-info">
                <span>Difficulté</span>
                <p>{recipe.difficulty}</p>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="main-info">
                <span>Coût</span>
                <p>{recipe.price}</p>
              </div>
            </div>
            <div className="recipe-author">
              Créé par&nbsp;
              <Link href={`/user/${recipe.author.id}?username=${recipe.author.username}`}>
                {recipe.author.username}
              </Link>
            </div>
          </RecipeInfo>
          <RecipePreparationContainer>
            <IngredientContainer>
              {recipe.ingredients.map((ing: any) => (
                <IngredientItem key={ing._id}>
                  {ing.name}
                  <Box>
                    <span>{ing.quantity}</span>
                    {ing.unity}
                  </Box>
                </IngredientItem>
              ))}
            </IngredientContainer>
            <StepContainer>
              {recipe.steps.map((ing: any) => (
                <StepItem key={ing._id}>
                  <div className="number-container" >
                    <div className="number">{ing.step_number}</div>
                  </div>
                  <div className="description" >{ing.description}</div>
                </StepItem>
              ))}
            </StepContainer>
          </RecipePreparationContainer>
          <CommentsSection>
            {
              isMounted && !auth.isLoggedIn ? (
                <p className="login-msg">Connectez-vous pour laisser un commentaire</p>
              ) : (
                <>
                  <CommentTitle>
                    Ajouter un commentaire
                  </CommentTitle>
                  <CommentInput
                    multiline
                    rows={3}
                    value={comment}
                    onChange={handleChange}
                    disabled={isMounted && !auth.isLoggedIn}
                  />
                  <ActionButton disabled={isMounted && !auth.isLoggedIn} onClick={addComment}>Envoyer</ActionButton>
                </>
              )
            }
            <div id="comment-section" className="comments">
              Commentaires:
            </div>
            {recipe.comments.map((ing: any) => (
              <Comment key={ing._id}>
                <div>
                  <span>{ing.author}</span> le {formatDate(ing.date)}
                </div>
                <div>{ing.text}</div>
              </Comment>
            ))}
          </CommentsSection>
        </RecipePaper>
      </RecipeContainer>
    </RecipePage>
  )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await RecipeService.getRecipe(params.id)
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

export default Recipe