import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { AxiosResponse } from "axios";
import _ from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../src/components/Navbar";
import RecipeCard from "../../src/components/RecipeCard";
import useAuthentication from "../../src/lib/hook/useAuthentication";
import UserService from "../../src/services/user.service";
import { UserContainer, UserGridRecipes, UserHeader, UserPage } from "../../styles/GlobalStyles";

const User: NextPage = () => {
  const router = useRouter()
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth);
  const user = useSelector((state: { user: User }) => state.user)
  const [userRecipes, setUserRecipes] = useState<any>([]);
  const [favoritesRecipes, setFavoritesRecipes] = useState<Array<RecipeProps>>([]);
  const [recipes, setRecipes] = useState<AxiosResponse>()

  useAuthentication()

  const getProfilUserData = async () => {
    if (_.isEmpty(user)) return
    const res = await UserService.getUserRecipes(router.query.id)
    setRecipes(res.data)
  }

  const getData = async () => {
    if (_.isEmpty(user)) return
    const res = await UserService.getUserRecipes(user._id)
    const resFav = await UserService.getUserFavoriteRecipes(user._id)
    setUserRecipes(res.data)
    setFavoritesRecipes(resFav.data)
  }

  useEffect(() => {
    if (auth.isLoggedIn && user) {
      getData()
    }
  }, [])


  useEffect(() => {
    getProfilUserData()
  }, [])

  return (
    <UserPage>
      <Navbar />
      <UserContainer>
        <UserHeader>
          {router.query.username}
        </UserHeader>
        <UserGridRecipes>
          {
            !recipes ? (
              <Box display="flex" justifyContent="center" width="100%">
                <CircularProgress />
              </Box>
            ) : (
              <>
                {
                  _.map(recipes, (recipe: any, index) => (
                    <RecipeCard
                      key={index}
                      recipe={recipe}
                      userRecipes={userRecipes}
                      setUserRecipes={setUserRecipes}
                      favoritesRecipes={favoritesRecipes}
                      setFavoritesRecipes={setFavoritesRecipes}
                      userId={user._id}
                      isLoggedIn={auth.isLoggedIn}
                    />
                  ))
                }
              </>
            )
          }
        </UserGridRecipes>
      </UserContainer>
    </UserPage>
  )
}

// export async function getServerSideProps({ params }: { params: { id: string } }) {
//   const res = await userService.getUserRecipes(params.id)
//   const data = res.data

//   console.log('res: ', res)

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { data }
//   }
// }

export default User
