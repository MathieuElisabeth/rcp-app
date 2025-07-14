import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import {
  Cancel,
  Delete,
  Edit,
  Favorite,
  Logout,
  ManageAccounts,
  MenuBook,
  Save
} from "@mui/icons-material"
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Tab,
  Tabs,
  TextField
} from "@mui/material"
import { Box } from "@mui/system"
import _ from "lodash"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { updateUser } from "../src/actions/user"
import { isEmail } from "../src/lib/utils"
import UserRecipe from "../src/services/user.service"
import { useAppDispatch } from "../store"
import bcrypt from "bcryptjs"
import {
  AccountContainer,
  AccountHeader,
  AccountPage,
  ActionButton,
  ContentTab,
  CustomTab,
  CustomTabs,
  DeleteAccountButton,
  DeleteSection,
  ErrorMessage,
  InfoUserContainer,
  InputForm,
  LogoutButton,
  RecipesContainer,
  RecipesLoader,
  SavePasswordButton,
  UserInfoForm,
  UserInfoTitle
} from "../styles/GlobalStyles"
import userService from "../src/services/user.service"
import { logout } from "../src/actions/auth"
import Navbar from "../src/components/Navbar"
import RecipeCard from "../src/components/RecipeCard"
import useAuthentication from "../src/lib/hook/useAuthentication"

interface Info {
  value: string
  isEditing: boolean
  error: string
}

interface UserInfo {
  username: Info
  email: Info
  password: Info
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const Account: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth)
  const user = useSelector((state: { user: User }) => state.user)
  const alert = useSelector((state: { message: { user: { message: string, field: string } } }) => state.message)
  const [tabsValue, setTabsValue] = useState<any>(Number(router.query.tab) || 0)
  const [openDialog, setOpenDialog] = useState(false)
  const [userRecipes, setUserRecipes] = useState<Array<RecipeProps>>([])
  const [favoritesRecipes, setFavoritesRecipes] = useState<Array<RecipeProps>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: {
      value: user.username,
      isEditing: false,
      error: ''
    },
    email: {
      value: user.email,
      isEditing: false,
      error: ''
    },
    password: {
      value: user.password,
      isEditing: false,
      error: ''
    },
  })

  useEffect(() => {
    setTabsValue(Number(router.query.tab))
  }, [router.query])


  const getData = async () => {
    const res = await UserRecipe.getUserRecipes(user._id)
    const resFav = await UserRecipe.getUserFavoriteRecipes(user._id)
    setUserRecipes(res.data)
    setFavoritesRecipes(resFav.data)
    setIsLoading(false)
  }

  function handleClickOpen() {
    setOpenDialog(true)
  }

  function handleClose() {
    setOpenDialog(false)
  }

  useEffect(() => {
    if (auth.isLoggedIn && user) {
      getData()
    }
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue)
  }

  function handleInfoChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, path: string) {
    setUserInfo((prevState: any) => ({
      ...prevState,
      [path]: {
        ...prevState[path],
        value: evt.target.value
      }
    }))
  }

  function handleEditing(path: string) {
    setUserInfo((prevState: any) => ({
      ...prevState,
      [path]: {
        // @ts-ignore
        value: user[path],
        isEditing: true
      }
    }))
  }

  function cancelEdition(path: string) {
    setUserInfo((prevState: any) => ({
      ...prevState,
      [path]: {
        // @ts-ignore
        value: user[path],
        isEditing: false
      }
    }))
  }

  function getError(path: string) {
    // @ts-ignore
    if (userInfo[path].value.trim() === '') {
      setUserInfo((prevState: any) => ({
        ...prevState,
        [path]: {
          ...prevState[path],
          error: 'Champ vide'
        }
      }))

      return false
    }

    if (path === 'email' && !isEmail(path)) {
      setUserInfo((prevState: any) => ({
        ...prevState,
        email: {
          ...prevState.email,
          error: 'Veuillez rentrer un email valide'
        }
      }))

      return false
    }

    return true
  }

  function isPasswordValid() {
    if (newPassword.length < 6) {
      setUserInfo((prevState: any) => ({
        ...prevState,
        password: {
          ...prevState.password,
          error: 'Votre mot de passe doit faire minimum 6 caractères'
        }
      }))

      return false
    }

    if (!bcrypt.compareSync(currentPassword, user.password)) {
      setUserInfo((prevState: any) => ({
        ...prevState,
        password: {
          ...prevState.password,
          error: 'Mot de passe incorrect'
        }
      }))

      return false
    }

    return true

  }

  function saveNewInfo(path: string) {
    if (!getError(path)) return

    if (path === 'password' && !isPasswordValid()) return
    let data = {
      id: user._id,
      user: {
        // @ts-ignore
        [path]: userInfo[path].value
      }
    }

    hashPassword(newPassword, path, data, setNewPassword, setCurrentPassword)

    dispatch(updateUser(data))
    setUserInfo((prevState: any) => ({
      ...prevState,
      [path]: {
        ...prevState[path],
        isEditing: false,
        error: ''
      }
    }))
  }

  async function deleteAccount(id: string) {
    const res: any = await userService.deleteUser(id)
    if (res.status === 200) {
      dispatch(logout())
      router.push('/')
    }
  }

  function LogOut() {
    router.push('/')
    dispatch(logout())
  }

  useAuthentication()

  return (
    <AccountPage>
      <Navbar setTabsValue={setTabsValue} />
      <AccountContainer>
        <Box sx={{ flexGrow: 1, display: 'flex', height: '100%' }}>
          <Box position="relative">
            <CustomTabs
              value={tabsValue}
              onChange={handleChange}
              orientation="vertical"
              variant="scrollable"
              sx={{ borderRight: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
            >
              <CustomTab
                label="Mes recettes"
                icon={<MenuBook />}
                iconPosition="end"
                $isActive={tabsValue === 0}
                {...a11yProps(0)}
              />
              <CustomTab
                label="Mes favoris"
                icon={<Favorite />}
                iconPosition="end"
                $isActive={tabsValue === 1}
                {...a11yProps(1)}
              />
              <CustomTab
                label="Info personnel"
                icon={<ManageAccounts />}
                iconPosition="end"
                $isActive={tabsValue === 2}
                {...a11yProps(2)}
              />
            </CustomTabs>
            <LogoutButton onClick={LogOut} endIcon={<Logout />}>Deconnexion</LogoutButton>
          </Box>

          <TabPanel value={tabsValue} index={0}>
            <AccountHeader>
              Mes recettes
            </AccountHeader>
            {
              isLoading ? (
                <RecipesLoader>
                  <CircularProgress />
                </RecipesLoader>
              ) : (
                <RecipesContainer>
                  {
                    _.map(userRecipes, (recipe: any, index) => (
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
                </RecipesContainer>
              )
            }
          </TabPanel>
          <TabPanel value={tabsValue} index={1}>
            <AccountHeader>
              Mes favoris
            </AccountHeader>
            {
              isLoading ? (
                <RecipesLoader>
                  <CircularProgress />
                </RecipesLoader>
              ) : (
                <RecipesContainer>
                  {
                    _.map(favoritesRecipes, (recipe: any, index) => (
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
                </RecipesContainer>
              )
            }
          </TabPanel>
          <TabPanel value={tabsValue} index={2}>
            <AccountHeader>
              Info personnel
            </AccountHeader>
            <InfoUserContainer>
              <UserInfoForm>
                <UserInfoTitle>
                  Pseudo
                </UserInfoTitle>
                <Box>
                  <InputForm value={userInfo.username.value} onChange={evt => handleInfoChange(evt, 'username')} disabled={!userInfo.username.isEditing} />
                  {
                    userInfo.username.isEditing ? (
                      <>
                        <Save onClick={() => saveNewInfo('username')} />
                        <Cancel style={{ marginLeft: '10px' }} onClick={() => cancelEdition('username')} />
                      </>
                    ) : (
                      <Edit onClick={() => handleEditing('username')} />
                    )
                  }
                </Box>
                <ErrorMessage>
                  {userInfo.username.error}
                </ErrorMessage>
                {
                  (alert?.user?.message && alert?.user?.field === 'username') && (
                    <ErrorMessage>
                      {alert?.user?.message}
                    </ErrorMessage>
                  )}
              </UserInfoForm>
              <UserInfoForm>
                <UserInfoTitle>
                  E-mail
                </UserInfoTitle>
                <Box>
                  <InputForm value={userInfo.email.value} onChange={evt => handleInfoChange(evt, 'email')} disabled={!userInfo.email.isEditing} />
                  {
                    userInfo.email.isEditing ? (
                      <>
                        <Save onClick={() => saveNewInfo('email')} />
                        <Cancel style={{ marginLeft: '10px' }} onClick={() => cancelEdition('email')} />
                      </>
                    ) : <Edit onClick={() => handleEditing('email')} />
                  }
                </Box>
                <ErrorMessage>
                  {userInfo.email.error}
                </ErrorMessage>
              </UserInfoForm>
              <UserInfoForm>
                <UserInfoTitle>
                  Mot de passe
                </UserInfoTitle>
                <Box>
                  {
                    userInfo.password.isEditing ? (
                      <Box flexDirection='column'>
                        <InputForm value={currentPassword} onChange={evt => setCurrentPassword(evt.target.value)} style={{ marginBottom: '10px' }} />
                        <InputForm value={newPassword} onChange={evt => setNewPassword(evt.target.value)} />
                        <Box flexDirection="column">
                          <Button onClick={() => cancelEdition('password')} style={{ marginBottom: '10px', marginRight: '10px', color: 'black' }}>
                            Annuler
                          </Button>
                          <SavePasswordButton startIcon={<Save />} onClick={() => saveNewInfo('password')}>
                            Modifier mot de passe
                          </SavePasswordButton>
                        </Box>
                      </Box>
                    ) : (
                      <Box marginTop='5px'>
                        <Box width='230px'>
                          {'*******'}
                        </Box>
                        <Edit style={{ marginLeft: '10px' }} onClick={() => handleEditing('password')} />
                      </Box>
                    )
                  }
                </Box>
                <ErrorMessage>
                  {userInfo.password.error}
                </ErrorMessage>
              </UserInfoForm>
            </InfoUserContainer>
            <Divider />
            <DeleteSection>
              <UserInfoTitle>
                Supprimer Compte
              </UserInfoTitle>
              <DeleteAccountButton onClick={handleClickOpen} endIcon={<Delete />}>Supprimer</DeleteAccountButton>
            </DeleteSection>
          </TabPanel>
        </Box>
      </AccountContainer>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Supprimer compte
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sur de vouloirs supprimer votre compte ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={() => deleteAccount(user._id)}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </AccountPage>
  )
}

export default Account

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <ContentTab
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="recipes">
          {children}
        </div>
      )}
    </ContentTab>
  )
}

function hashPassword(newPassword: string, path: string, data: { id?: string; user: any }, setNewPassword: { (value: SetStateAction<string>): void; (arg0: string): void }, setCurrentPassword: { (value: SetStateAction<string>): void; (arg0: string): void }) {
  if (path === 'password') {
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(newPassword, salt)
    data.user.password = hashPassword
    setCurrentPassword('')
    setNewPassword('')
  }
}