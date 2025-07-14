import { Add, Delete, Edit, Remove } from "@mui/icons-material"
import { Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { Box } from "@mui/system"
import _ from "lodash"
import Image from "next/image"
import Router, { useRouter } from "next/router"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ActionButton, ErrorMessage, InputForm } from "../../../styles/GlobalStyles"
import { INGREDIENT_UNITY, PLAT_DIFFICULTY, PLAT_PRICE, PLAT_TYPES } from "../../lib/constants"
import { converteBase64toURL, getBase64 } from "../../lib/utils"
import { AddItemButton, DropdownsFormList, ImageInput, IngredientsFormList, Overlay, PaperForm, RecipeFieldForm, RecipeImage, StepArea } from "./RecipeForm.style"

interface RecipeProps {
  _id?: string
  title?: string
  type?: string
  difficulty?: string
  number_persons?: number
  price?: string
  preparation_time?: number
  ingredients?: Array<Ingredients>
  steps?: Array<Steps>
  image?: string
  comments?: Array<Comment>
  likes?: number
  buttonName: string
  submit: any
}


function RecipeForm({
  title,
  type,
  difficulty,
  number_persons,
  price,
  preparation_time,
  ingredients,
  steps,
  image,
  buttonName,
  submit,
}: RecipeProps) {
  const router = useRouter()
  const [recipeName, setRecipeName] = useState(title || "")
  const [platType, setPlatType] = useState(type || "plat")
  const [recipeDifficulty, setRecipeDifficulty] = useState(difficulty || "moyen")
  const [numberPersons, setNumberPersons] = useState(number_persons || 1)
  const [recipePrice, setRecipePrice] = useState(price || "bon marché")
  const [preparationTime, setPreparationTime] = useState(preparation_time || "")
  const [ingredientsList, setIngredientsList] = useState(ingredients || [{ name: "", quantity: "", unity: "" }])
  const [stepsList, setStepsList] = useState(steps || [{ step_number: 1, description: "" }])
  const [recipeImage, setRecipeImage] = useState(image || "")
  const [preview, setPreview] = useState('')
  const [newRecipe, setNewRecipe] = useState({
    title: recipeName,
    type: platType,
    difficulty: recipeDifficulty,
    number_persons: numberPersons,
    price: recipePrice,
    preparation_time: preparationTime,
    ingredients: ingredientsList,
    steps: stepsList,
    image: recipeImage
  })

  const alert = useSelector((state: { message: { recipe: { message: string, field: string } } }) => state.message)


  useEffect(() => {
    if (!recipeImage) {
      setPreview('')
      return
    }

    converteBase64toURL(recipeImage, setPreview)
  }, [recipeImage])

  function handleImageState(data: SetStateAction<string>) {
    setRecipeImage(data)
    setNewRecipe((prevState: any) => ({
      ...prevState,
      image: data
    })
    )
  }

  function onSelectFile(evt: any) {
    if (!evt.target.files || evt.target.files.length === 0) {
      return
    }

    getBase64(evt.target.files[0], handleImageState)
  }

  function removeImage() {
    setRecipeImage('')
    setNewRecipe((prevState: any) => ({
      ...prevState,
      image: ''
    })
    )
  }

  const handleTitleChange = (evt: { target: { value: SetStateAction<string> } }) => {
    setRecipeName(evt.target.value)
    setNewRecipe((prevState: any) => ({
      ...prevState,
      title: evt.target.value
    })
    )
  }

  const handleValueRange = (evt: any) => {
    const newValue = Math.min(Math.max(evt.target.value, 1), 10)
    setNumberPersons(newValue)
    setNewRecipe(prevState => ({
      ...prevState,
      number_persons: newValue
    })
    )
  }

  const handleIngredientsChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | (Event & { target: { value: string; name: string } }), index: number) => {
    const { name, value } = evt.target
    const list: any = [...ingredientsList]
    list[index][name] = value
    setIngredientsList(list)
    setNewRecipe(prevState => ({
      ...prevState,
      ingredients: list
    })
    )
  }

  const handleRemoveIngredient = (index: number) => {
    const list = [...ingredientsList]
    list.splice(index, 1)
    setIngredientsList(list)
    setNewRecipe(prevState => ({
      ...prevState,
      ingredients: list
    })
    )
  }

  const handleAddIngredient = () => {
    setIngredientsList([...ingredientsList, { name: "", quantity: "", unity: "" }])
  }

  const handleStepsChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | (Event & { target: { value: string; name: string } }), index: number) => {
    const list: any = [...stepsList]
    list[index].description = evt.target.value
    setStepsList(list)
    setNewRecipe(prevState => ({
      ...prevState,
      steps: list
    })
    )
  }

  const handleRemoveStep = (index: number) => {
    const list = [...stepsList]
    list.splice(index, 1)
    setStepsList(list)
    setNewRecipe(prevState => ({
      ...prevState,
      steps: list
    })
    )
  }

  const handleAddStep = () => {
    setStepsList([...stepsList, { step_number: stepsList.length + 1, description: "" }])
  }

  const handlePreparationTime = (evt: any) => {
    if (!Number(evt.target.value)) return
    setPreparationTime(evt.target.value)
    setNewRecipe(prevState => ({
      ...prevState,
      preparation_time: evt.target.value
    })
    )
  }

  const handleRecipePrice = (evt: { target: { value: SetStateAction<string> } }) => {
    setRecipePrice(evt.target.value)
    setNewRecipe((prevState: any) => ({
      ...prevState,
      price: evt.target.value
    })
    )
  }

  const handlePlatType = (evt: { target: { value: SetStateAction<string> } }) => {
    setPlatType(evt.target.value)
    setNewRecipe((prevState: any) => ({
      ...prevState,
      type: evt.target.value
    })
    )
  }

  const handleRecipeDifficulty = (evt: { target: { value: SetStateAction<string> } }) => {
    setRecipeDifficulty(evt.target.value)
    setNewRecipe((prevState: any) => ({
      ...prevState,
      difficulty: evt.target.value
    })
    )
  }

  return (
    <PaperForm>
      <RecipeFieldForm>
        Nom de la recette
        <InputForm className="fullwidth" value={recipeName} onChange={handleTitleChange} />
        {(alert?.recipe?.message && alert?.recipe?.field === 'title') && (
          <ErrorMessage>
            {alert?.recipe?.message}
          </ErrorMessage>
        )}
      </RecipeFieldForm>
      <DropdownsFormList>
        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={platType}
              onChange={handlePlatType}
              label="Type"
            >
              {
                _.map(PLAT_TYPES, type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Difficulté</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Difficulté"
              value={recipeDifficulty}
              onChange={handleRecipeDifficulty}
            >
              {
                _.map(PLAT_DIFFICULTY, type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Prix</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={recipePrice}
              onChange={handleRecipePrice}
              label="Prix"
            >
              {
                _.map(PLAT_PRICE, type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
      </DropdownsFormList>
      <RecipeFieldForm>
        Temps de péparation
        <Box display="flex">
          <InputForm value={preparationTime} onChange={handlePreparationTime} />
          min.
        </Box>
        {(alert?.recipe?.message && alert?.recipe?.field === 'preparation_time') && (
          <ErrorMessage>
            {alert?.recipe?.message}
          </ErrorMessage>
        )}
      </RecipeFieldForm>
      <RecipeFieldForm>
        Nombre de personne
        <InputForm type="number" value={numberPersons} onChange={handleValueRange} inputProps={{ min: 1, max: 10 }} />
      </RecipeFieldForm>
      <Divider />
      <Box marginY="15px">
        <Box marginY="15px">
          Ingrédients
          {
            _.map(ingredientsList, (ingredient, index) => (
              <IngredientsFormList key={`ingredients-${index}`}>
                <RecipeFieldForm>
                  Nom
                  <InputForm name="name" value={ingredient.name} onChange={evt => handleIngredientsChange(evt, index)} />
                  {(alert?.recipe?.message && _.includes(alert?.recipe?.field, 'ingredients') && !ingredientsList[index].name) && (
                    <ErrorMessage>
                      {alert?.recipe?.message}
                    </ErrorMessage>
                  )}
                </RecipeFieldForm>
                <RecipeFieldForm>
                  Quantité
                  <InputForm className="quantity" name="quantity" value={ingredient.quantity} onChange={evt => handleIngredientsChange(evt, index)} />
                  {(alert?.recipe?.message && _.includes(alert?.recipe?.field, 'ingredients') && !ingredientsList[index].quantity) && (
                    <ErrorMessage>
                      {alert?.recipe?.message}
                    </ErrorMessage>
                  )}
                  {(alert?.recipe?.message && alert?.recipe?.field === 'ingredients' && !ingredientsList[index].quantity) && (
                    <ErrorMessage>
                      {alert?.recipe?.message}
                    </ErrorMessage>
                  )}
                </RecipeFieldForm>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Unité</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Unité"
                    name="unity"
                    value={ingredient.unity}
                    onChange={evt => handleIngredientsChange(evt, index)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      _.map(INGREDIENT_UNITY, type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                {ingredientsList.length !== 1 && <IconButton onClick={() => handleRemoveIngredient(index)}><Remove /></IconButton>}
              </IngredientsFormList>
            ))
          }
          <AddItemButton onClick={handleAddIngredient} endIcon={<Add />}>
            Ajouter un ingédient
          </AddItemButton>
        </Box>
        <Divider />
        <Box marginY="15px">
          Étapes
          {
            _.map(stepsList, (step, index) => (
              <RecipeFieldForm key={step.step_number} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <StepArea>
                  {step.step_number}.
                  <InputForm
                    className="fullwidth step-area"
                    multiline
                    rows={2}
                    value={step.description}
                    onChange={evt => handleStepsChange(evt, index)}
                  />
                </StepArea>
                {(alert?.recipe?.message && _.includes(alert?.recipe?.field, 'steps') && !stepsList[index].description) && (
                  <ErrorMessage>
                    {alert?.recipe?.message}
                  </ErrorMessage>
                )}
                {stepsList.length !== 1 && <IconButton onClick={() => handleRemoveStep(index)}><Remove /></IconButton>}
              </RecipeFieldForm>
            ))
          }
          <AddItemButton onClick={handleAddStep} endIcon={<Add />}>
            Ajouter une étape
          </AddItemButton>
          {/* <IconButton onClick={handleAddStep}><Add /></IconButton> */}
        </Box>
      </Box>
      <Divider />
      <RecipeImage>
        <Typography style={{ margin: '20px' }}>
          Ajouter une image (optionnel)
        </Typography>
        {
          preview ? (
            <Box position="relative" borderRadius="10px" overflow="hidden">
              <Image
                src={preview} alt="prévisualisation de l'image"
                width={400}
                height={400}
                objectFit="contain"
              />
              <Overlay>
                <div className="image-menu">
                  <IconButton>
                    <label htmlFor="file-edit" >
                      <Edit />
                    </label>
                  </IconButton>
                  <input id="file-edit" type='file' onChange={onSelectFile} />
                  <IconButton onClick={removeImage}>
                    <Delete />
                  </IconButton>
                </div>
              </Overlay>
            </Box>
          ) : (
            <>
              <ImageInput htmlFor="file" className="label-file">Choisir une image</ImageInput>
              <input id="file" type='file' onChange={onSelectFile} />
            </>
          )
        }
      </RecipeImage>
      <Box display="flex" width="100%" justifyContent="flex-end">
        <Box display="flex">
          <Button style={{ margin: '0 10px' }} onClick={() => router.back()}>Annuler</Button>
          <ActionButton style={{ textTransform: 'none' }} onClick={() => submit(newRecipe)}>{buttonName}</ActionButton>
        </Box>
      </Box>
    </PaperForm>
  )
}

export default RecipeForm