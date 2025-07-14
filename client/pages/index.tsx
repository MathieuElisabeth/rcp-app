import { SearchRounded } from '@mui/icons-material'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../src/components/Navbar'
import recipesService from '../src/services/recipes.service'
import {
  HomePage,
  HomePageContainer,
  HomePageHeader,
  InputSearch,
  RecipesSwiper,
  SearchContainer,
  SwiperHeader
} from '../styles/GlobalStyles'
import { SwiperSlide } from 'swiper/react'
import { CircularProgress } from '@mui/material'
import RecipeCard from '../src/components/RecipeCard'
import userService from '../src/services/user.service'
import { Box } from '@mui/system'
import _ from 'lodash'
import { Navigation } from 'swiper'


const Home: NextPage = () => {
  const router = useRouter()
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth);
  const user = useSelector((state: { user: User }) => state.user)
  const [search, setSearch] = useState<string>('')
  const [userRecipes, setUserRecipes] = useState<any>([])
  const [favoritesRecipes, setFavoritesRecipes] = useState<Array<any>>([]);
  const [mostLikedRecipe, setMostLikedRecipes] = useState<any>([]);
  const [lastRecipes, setLastRecipes] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    if (!_.isEmpty(user)) {
      const userRecipe = await userService.getUserRecipes(user._id)
      const userFavoritesRecipes = await userService.getUserFavoriteRecipes(user._id)
      setUserRecipes(userRecipe.data)
      setFavoritesRecipes(userFavoritesRecipes.data)
    }
    const mostLiked = await recipesService.getMostLikedRecipes()
    const lastRecipes = await recipesService.getLastRecipes()
    setMostLikedRecipes(mostLiked.data)
    setLastRecipes(lastRecipes.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <HomePage>
      <Navbar />
      <HomePageContainer>
        <HomePageHeader>
          <p>Découvrez{" "}
            <Link href="/search">
              <span>les recettes</span>
            </Link>{" "}
            faites par la communauté</p>
          <SearchContainer>
            <InputSearch
              type="text"
              placeholder="Chercher une recette"
              className="InputForm"
              value={search}
              onChange={evt => setSearch(evt.target.value)}
            />
            <button onClick={() => router.push(`/search?name=${search}`)}>
              <SearchRounded />
            </button>
          </SearchContainer>
        </HomePageHeader>
        <SwiperHeader>
          Les plus populaires
        </SwiperHeader>
        {
          isLoading ? (
            <Box width="100%" display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Box overflow="hidden" margin="0px -24px" padding="5px 22px" marginBottom="50px" >
              <RecipesSwiper
                modules={[Navigation]}
                spaceBetween={20}
                navigation
                breakpoints={{
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 10
                  },
                  700: {
                    slidesPerView: 3,
                    spaceBetween: 20
                  },
                  940: {
                    slidesPerView: 4,
                    spaceBetween: 20
                  }
                }}
              >
                {
                  _.map(mostLikedRecipe, (recipe: any, index) => (
                    <SwiperSlide key={`most-liked-${index}`}>
                      <RecipeCard
                        recipe={recipe}
                        userRecipes={userRecipes}
                        setUserRecipes={setUserRecipes}
                        favoritesRecipes={favoritesRecipes}
                        setFavoritesRecipes={setFavoritesRecipes}
                        userId={user._id}
                        isLoggedIn={auth.isLoggedIn}
                      />
                    </SwiperSlide>
                  ))
                }
              </RecipesSwiper>
            </Box>
          )
        }
        <SwiperHeader>
          Les nouvelles recettes
        </SwiperHeader>
        {
          isLoading ? (
            <Box width="100%" display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Box overflow="hidden" margin="0px -24px" padding="5px 22px">
              <RecipesSwiper
                modules={[Navigation]}
                spaceBetween={20}
                // slidesPerView={4}
                navigation
                breakpoints={{
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 10
                  },
                  700: {
                    slidesPerView: 3,
                    spaceBetween: 20
                  },
                  940: {
                    slidesPerView: 4,
                    spaceBetween: 20
                  }
                }}
              >
                {
                  _.map(lastRecipes, (recipe: any, index) => (

                    <SwiperSlide key={`last-recipes-${index}`}>
                      <RecipeCard
                        recipe={recipe}
                        userRecipes={userRecipes}
                        setUserRecipes={setUserRecipes}
                        favoritesRecipes={favoritesRecipes}
                        setFavoritesRecipes={setFavoritesRecipes}
                        userId={user._id}
                        isLoggedIn={auth.isLoggedIn}
                      />
                    </SwiperSlide>
                  ))
                }
              </RecipesSwiper>
            </Box>
          )
        }
      </HomePageContainer>
    </HomePage>
  )
}

export default Home
