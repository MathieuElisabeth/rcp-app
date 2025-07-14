import { NextPage } from 'next'
import { SearchRounded, TuneRounded } from "@mui/icons-material";
import _ from "lodash";
import { SetStateAction, useEffect, useState } from "react"
import { InputSearch, SearchContainer } from "../styles/GlobalStyles";
import {
  FilterButton,
  FilterColumn,
  FilterRecipe,
  FilterTypeButton,
  GridRecipes,
  SearchHeader,
  SearchPage,
  SearchPageContainer
} from "../styles/Search.style";
import { useRouter } from 'next/router';
import RecipeService from '../src/services/recipes.service';
import UserService from "../src/services/user.service"
import useDebounce from '../src/lib/hook/useDebounce';
import Navbar from '../src/components/Navbar';
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import RecipeCard from '../src/components/RecipeCard';
import { CircularProgress } from '@mui/material';

const FILTER_ATTRIBUTES = [
  {
    type: 'Type de plat',
    names: ['entrée', 'plat', 'dessert']
  },
  {
    type: 'Coût',
    names: ['bon marché', 'prix moyen', 'coûteux']
  },
  {
    type: 'Temps de préparation',
    names: ['< 20min.', '< 45min.', '< 60min.']
  },
  {
    type: 'Difficulté',
    names: ['facile', 'moyen', 'difficile']
  },
]

const Search: NextPage = () => {
  const router = useRouter()
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth);
  const user = useSelector((state: { user: User }) => state.user)
  const [userRecipes, setUserRecipes] = useState<any>([]);
  const [favoritesRecipes, setFavoritesRecipes] = useState<Array<RecipeProps>>([]);
  const [filterHidden, setFilterHidden] = useState<boolean>(true);
  const [search, setSearch] = useState<any>(router.query?.name || '')
  const [recipes, setRecipes] = useState<AxiosResponse>()
  const [isLoading, setIsLoading] = useState(true)
  const [filterRecipes, setFilterRecipes] = useState<Array<object>>([])
  const [selectedPlatType, setSelectedPlatType] = useState<Array<string>>([])
  const [selectedPrice, setSelectedPrice] = useState<Array<string>>([])
  const [selectedPreparationTime, setSelectedPreparationTime] = useState<Array<string>>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<Array<string>>([])
  const debouncedSearch = useDebounce<string>(search, 500)

  const getSearchResult = async () => {
    const res = await RecipeService.getRecipeSearch(search)
    setRecipes(res.data)
    setIsLoading(false)
  }

  const getData = async () => {
    if (!_.isEmpty(user)) return
    const userRecipe = await UserService.getUserRecipes(user._id)
    const userFavoritesRecipes = await UserService.getUserFavoriteRecipes(user._id)
    setUserRecipes(userRecipe.data)
    setFavoritesRecipes(userFavoritesRecipes.data)
  }

  useEffect(() => {
    if (auth.isLoggedIn && user) {
      getData()
    }
  }, [])

  useEffect(() => {
    getSearchResult()
  }, [debouncedSearch])

  const filterPlatType = (recipes: any) => {
    if (_.isEmpty(selectedPlatType)) return recipes
    return _.filter(recipes, recipe => _.includes(selectedPlatType, recipe.type))
  }
  const filterPrice = (recipes: any) => {
    if (_.isEmpty(selectedPrice)) return recipes
    return _.filter(recipes, recipe => _.includes(selectedPrice, recipe.price))
  }
  const filterTimePreparation = (recipes: any) => {
    if (_.isEmpty(selectedPreparationTime)) return recipes
    return _.filter(recipes, recipe => {
      if (_.includes(selectedPreparationTime, "< 20min.") && recipe.preparation_time <= 20) {
        return true
      }
      if (_.includes(selectedPreparationTime, "< 45min.") && recipe.preparation_time <= 45) {
        return true
      }
      if (_.includes(selectedPreparationTime, "< 60min.") && recipe.preparation_time <= 60) {
        return true
      }

      return false
    })
  }
  const filterDifficulty = (recipes: any) => {
    if (_.isEmpty(selectedDifficulty)) return recipes
    return _.filter(recipes, recipe => _.includes(selectedDifficulty, recipe.difficulty))
  }

  useEffect(() => {
    let recipesFilter: any = recipes

    recipesFilter = filterPlatType(recipesFilter)
    recipesFilter = filterPrice(recipesFilter)
    recipesFilter = filterTimePreparation(recipesFilter)
    recipesFilter = filterDifficulty(recipesFilter)

    setFilterRecipes(recipesFilter)

  }, [recipes, selectedPlatType, selectedPrice, selectedDifficulty, selectedPreparationTime]);



  const recipeSearchHandler = (evt: { target: { value: SetStateAction<string>; }; }) => {
    setSearch(evt.target.value)
  }


  const handleFilter = (name: string, state: string[], setState: { (value: SetStateAction<string[]>): void; (value: SetStateAction<string[]>): void; (value: SetStateAction<string[]>): void; (value: SetStateAction<string[]>): void; (arg0: any[]): void; }) => {
    if (_.includes(state, name)) {
      setState(_.filter(state, n => n !== name))
    } else {
      setState([...state, name])
    }
  }


  const renderFilterButton = (filter: { type: any; names?: string[]; }, name: string) => {
    if (filter.type === 'Type de plat') {
      return (
        <FilterTypeButton
          key={name}
          onClick={() => handleFilter(name, selectedPlatType, setSelectedPlatType)}
          $isActive={_.includes(selectedPlatType, name)}
        >
          {name}
        </FilterTypeButton>
      )
    }
    if (filter.type === 'Coût') {
      return (
        <FilterTypeButton
          key={name}
          onClick={() => handleFilter(name, selectedPrice, setSelectedPrice)}
          $isActive={_.includes(selectedPrice, name)}
        >
          {name}
        </FilterTypeButton>
      )
    }
    if (filter.type === 'Temps de préparation') {
      return (
        <FilterTypeButton
          key={name}
          onClick={() => handleFilter(name, selectedPreparationTime, setSelectedPreparationTime)}
          $isActive={_.includes(selectedPreparationTime, name)}
        >
          {name}
        </FilterTypeButton>
      )
    }
    if (filter.type === 'Difficulté') {
      return (
        <FilterTypeButton
          key={name}
          onClick={() => handleFilter(name, selectedDifficulty, setSelectedDifficulty)}
          $isActive={_.includes(selectedDifficulty, name)}
        >
          {name}
        </FilterTypeButton>
      )
    }
  }

  return (
    <SearchPage>
      <Navbar />
      <SearchPageContainer>
        <SearchHeader>

          <SearchContainer>
            <FilterButton onClick={() => setFilterHidden(!filterHidden)}>
              <TuneRounded />
            </FilterButton>

            <InputSearch
              type="text"
              placeholder="Chercher une recette"
              value={search}
              onChange={recipeSearchHandler}
            />
            <button >
              <SearchRounded />
            </button>

          </SearchContainer>

          <FilterRecipe isHidden={filterHidden}>
            {
              _.map(FILTER_ATTRIBUTES, filter => (
                <FilterColumn key={filter.type}>
                  <h3>
                    {filter.type}
                  </h3>
                  <div className="filter">
                    {_.map(filter.names, name => {
                      return renderFilterButton(filter, name)
                    })}
                  </div>
                </FilterColumn>
              ))
            }
          </FilterRecipe>

        </SearchHeader>

        <>
          {
            isLoading ? (
              <div className="loader">
                <CircularProgress />
              </div>
            ) : (
              <GridRecipes>
                {
                  _.map(filterRecipes, (recipe: any, index) => (
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
              </GridRecipes>
            )
          }
        </>

      </SearchPageContainer>
    </SearchPage>
  )
}

export default Search