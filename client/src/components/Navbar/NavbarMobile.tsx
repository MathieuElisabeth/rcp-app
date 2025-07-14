import {
  Add,
  Brightness4,
  Brightness7,
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  House,
  HouseOutlined,
  Logout,
  ManageAccounts,
  ManageAccountsOutlined,
  Menu,
  MenuBook,
  MenuBookOutlined,
  Restaurant
} from "@mui/icons-material"
import { BottomNavigation, BottomNavigationAction, Drawer, IconButton, List, ListItem, SvgIcon } from '@mui/material'
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Link from "next/link"
import { useRouter } from "next/router"
import { SetStateAction, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../store"
import { CustomSVG } from "../../../styles/GlobalStyles"
import { logout } from "../../actions/auth"
import useOnClickOutside from "../../lib/hook/useOnClickOutside"
import {
  DrawerRegiterButton,
  Header,
  HeaderLogo,
  HeaderMenu,
  HeaderMobileContainer,
  LoginButton,
  NavigationMobile,
  NewRecipeButton,
} from "./Navbar.style"


const NavbarMobile = ({
  isLoggedIn,
  setTabsValue,
  colorMode,
  theme
}: {
  isLoggedIn: Boolean,
  setTabsValue?: any,
  colorMode: { toggleColorMode: any },
  theme: { palette: { mode: string } }
}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth);
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(router.query.name || 'home');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setIsOpen(open);
      };

  const logOut = () => {
    router.push('/')
    dispatch(logout())
  }

  const handleTabs = (tab: number, name: any) => {
    if (router.pathname !== '/account') {
      router.push({
        pathname: `/account`,
        query: {
          tab,
          name
        }
      })
    }
    if (setTabsValue) {
      setTabsValue(tab)
    }
    setValue(name)
  }

  return (
    <>
      <Header>
        <HeaderMobileContainer>
          <HeaderLogo>LaRecette</HeaderLogo>

          <HeaderMenu>
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              className="toggle-theme"
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
            {
              isLoggedIn ? (
                <IconButton onClick={logOut}>
                  <Logout />
                </IconButton>
              ) : (
                <IconButton onClick={toggleDrawer(true)}>
                  <Menu />
                </IconButton>
              )
            }
          </HeaderMenu>

        </HeaderMobileContainer>
      </Header>

      {
        isLoggedIn && (
          <NavigationMobile value={value} onChange={handleChange}>
            <BottomNavigationAction
              label="Accueil"
              value="home"
              icon={value === "home" ? <House /> : <HouseOutlined />}
              onClick={() => router.push('/')}
            />
            <BottomNavigationAction
              label="Mes recettes"
              value="myrecipes"
              icon={value === "myrecipes" ? <MenuBook /> : <MenuBookOutlined />}
              onClick={() => handleTabs(0, "myrecipes")}
            />
            <NewRecipeButton onClick={() => router.push('/recipe/create')}>
              <div className="button-add">
                <Add />
              </div>
            </NewRecipeButton>
            <BottomNavigationAction
              label="Favorites"
              value="favorites"
              icon={value === "favorites" ? <Favorite /> : <FavoriteBorder />}
              onClick={() => handleTabs(1, "favorites")}
            />
            <BottomNavigationAction
              label="Mon compte"
              value="myaccount"
              icon={value === "myaccount" ? <ManageAccounts /> : <ManageAccountsOutlined />}
              onClick={() => handleTabs(2, "myaccount")}
            />
          </NavigationMobile>
        )
      }
      <Drawer
        anchor='right'
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <List>
          <ListItem >
            {/* <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton> */}
            <Link href='/register'>
              <DrawerRegiterButton>
                <Typography>
                  S&apos;inscrire
                </Typography>
              </DrawerRegiterButton>
            </Link>
          </ListItem>
          <ListItem >
            <Link href='/login'>
              <LoginButton>
                <Typography>
                  Se connecter
                </Typography>
              </LoginButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default NavbarMobile