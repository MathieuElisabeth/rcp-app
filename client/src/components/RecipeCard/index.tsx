import { Delete, Edit, Euro, Favorite, FavoriteBorder, Timer } from '@mui/icons-material'
import { Button, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DEFAULT_RECIPE_IMAGE } from '../../lib/constants'
import { converteBase64toURL, convertMinuteToHour } from '../../lib/utils'
import { ChipePlatType, Overlay, RecipeCardContainer, RecipeInfo } from './RecipeCard.style'
import { useRouter } from 'next/router'
import _ from 'lodash'
import recipesService from '../../services/recipes.service'
import { useAppDispatch } from '../../../store'
import { likeRecipe } from '../../actions/user'

const COLOR_PLAT_TYPE: any = {
  'entrée': '#2eda64',
  'plat': '#ff7e7e',
  'dessert': '#84b7ff',
}

function RecipeCard({
  recipe,
  userRecipes,
  setUserRecipes,
  favoritesRecipes,
  setFavoritesRecipes,
  userId,
  isLoggedIn
}: {
  recipe: RecipeProps,
  userRecipes: Array<RecipeProps>,
  favoritesRecipes: Array<RecipeProps>,
  setUserRecipes: Function,
  setFavoritesRecipes: Function,
  userId?: String,
  isLoggedIn?: Boolean
}) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState(false)
  const [imageURL, setImageURL] = useState(DEFAULT_RECIPE_IMAGE)
  const [likeNumber, setLikeNumber] = useState(recipe.likes);


  useEffect(() => {
    if (!recipe?.image) {
      setImageURL(DEFAULT_RECIPE_IMAGE)
      return
    }

    converteBase64toURL(recipe?.image, setImageURL)
  }, [recipe?.image])

  const {
    title,
    type,
    difficulty,
    price,
    author,
    likes,
    preparation_time
  } = recipe


  const handleDeleteRecipe = (evt: { preventDefault: () => void; stopPropagation: () => void; }, id: string) => {
    evt.preventDefault()
    evt.stopPropagation()
    setUserRecipes(_.filter(userRecipes, state => state._id !== id))
    recipesService.deleteRecipe(id)
    // recipesService.deleteRecipe(id, userId)
  }


  function handleClickOpen() {
    setOpenDialog(true)
  }

  function handleClose() {
    setOpenDialog(false)
  }

  function handleLike(_id: string) {

    if (!isLoggedIn || !userId) return router.push('/login')

    const favoritesClone = [...favoritesRecipes]

    if (_.some(favoritesRecipes, { _id })) {
      _.pull(favoritesClone, recipe)
      setFavoritesRecipes(_.filter(favoritesRecipes, state => state._id !== _id))
      setLikeNumber(likeNumber - 1)
    } else {
      favoritesClone.push(recipe)
      setFavoritesRecipes(favoritesClone)
      setLikeNumber(likeNumber + 1)
    }
    const data = {
      userId: userId,
      recipeId: recipe._id
    }
    dispatch(likeRecipe(data, favoritesClone))
  }

  function getPrice(price: string) {
    switch (price) {
      case "bon marché":
        return <Euro />
      case "prix moyen":
        return (
          <>
            <Euro />
            <Euro />
          </>
        )
      case "coûteux":
        return (
          <>
            <Euro />
            <Euro />
            <Euro />
          </>
        )
      default:
        break;
    }
  }

  return (
    <>
      <RecipeCardContainer>
        <Box position="relative">
          <CardMedia
            component="img"
            height="140"
            image={imageURL}
          />
          <Overlay />
        </Box>
        <CardContent>
          <a href={`/recipe/${recipe._id}`}>
            <Typography gutterBottom className='recipe-name'>
              {title}
            </Typography>
          </a>
          <Box display="flex" flexDirection="column" alignItems="center" fontSize="14px">
            <ChipePlatType label={type} $colorTag={COLOR_PLAT_TYPE[type]} variant="outlined" />
            <RecipeInfo>{difficulty}</RecipeInfo>
            <RecipeInfo className='preparation-time'>
              {convertMinuteToHour(preparation_time)}<Timer />
            </RecipeInfo>
            <RecipeInfo className='price'>{getPrice(price)}</RecipeInfo>
          </Box>
        </CardContent>
        <CardActions>
          <Box fontSize="14px">
            {
              isLoggedIn && _.some(userRecipes, { _id: recipe._id }) ? (
                <div className='recipe-control'>
                  <Edit
                    onClick={() => router.push(`/recipe/update/${recipe._id}`)}
                  />
                  {
                    router.pathname === '/account' && <Delete onClick={handleClickOpen} />
                  }
                </div>
              ) : (
                <>
                  de
                  <Link href={`/user/${author.id}?username=${author.username}`}>
                    <span className='author'>{author.username}</span>
                  </Link>
                </>
              )
            }
          </Box>
          <Box marginX="8px">
            {/* <div className={`heart ${isAcitveFavorite}`} onClick={() => handleLike(recipe._id)}></div> */}
            {likeNumber}
            <IconButton disabled={_.some(userRecipes, { _id: recipe._id })} onClick={() => handleLike(recipe._id)}>
              {
                isLoggedIn && _.some(favoritesRecipes, { _id: recipe._id }) ? (
                  <>
                    <Favorite style={{ color: 'red' }} />
                  </>
                ) : (
                  <>
                    <FavoriteBorder />
                  </>
                )
              }
            </IconButton>
          </Box>
        </CardActions>
      </RecipeCardContainer>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Supprimer une recette
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sur de vouloirs supprimer la recette de {recipe.title} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={evt => handleDeleteRecipe(evt, recipe._id)}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RecipeCard
