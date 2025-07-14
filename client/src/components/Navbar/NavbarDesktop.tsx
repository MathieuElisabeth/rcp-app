import { AccountCircle, Brightness4, Brightness7, Favorite, Logout, ManageAccounts, MenuBook, Restaurant } from "@mui/icons-material"
import { Box, IconButton, SvgIcon } from '@mui/material'
import { Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { useAppDispatch } from "../../../store"
import { CustomSVG } from "../../../styles/GlobalStyles"
import { logout } from "../../actions/auth"
import useOnClickOutside from "../../lib/hook/useOnClickOutside"
import { DropdownItem, DropdownMenu, Header, HeaderContainer, HeaderDropdown, HeaderLogo, HeaderMenu, LoginButton, NewReciperButton, RegisterButton } from "./Navbar.style"

const NavbarDesktop = ({
  isLoggedIn,
  colorMode,
  theme
}: {
  isLoggedIn: boolean,
  colorMode: { toggleColorMode: any },
  theme: { palette: { mode: string } }
}) => {
  const router = useRouter()
  const dropdownRef = useRef(null);
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)

  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  const logOut = () => {
    router.push('/')
    dispatch(logout())
  }

  const handleNavigation = (tab: number, name: string) => {
    router.push({
      pathname: `/account`,
      query: {
        tab,
        name
      }
    })
  }

  return (
    <Header>
      <HeaderContainer>
        <HeaderLogo>
          <Link href='/'>
            LaRecette
          </Link>
        </HeaderLogo>
        <Box display="flex" alignItems="center">
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
              <HeaderMenu>
                <Link href='/recipe/create'>
                  <NewReciperButton endIcon={<Restaurant />}>
                    <Typography>
                      Nouvelle recette
                    </Typography>
                  </NewReciperButton>
                </Link>
                <HeaderDropdown>
                  <IconButton onClick={() => setIsOpen(!isOpen)}>
                    <CustomSVG size={40}>
                      <AccountCircle />
                    </CustomSVG>
                  </IconButton>

                  <DropdownMenu ref={dropdownRef} isOpen={isOpen}>
                    <DropdownItem className="item-1" onClick={() => handleNavigation(0, "myrecipes")}>
                      <IconButton
                        sx={{
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "transparent"
                          }
                        }}
                      >
                        <CustomSVG size={20}>
                          <MenuBook />
                        </CustomSVG>
                      </IconButton>
                      Mes recettes
                    </DropdownItem>

                    <DropdownItem className="item-2" onClick={() => handleNavigation(1, "favorites")}>
                      <IconButton
                        sx={{
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "transparent"
                          }
                        }}
                      >
                        <CustomSVG size={20}>
                          <Favorite />
                        </CustomSVG>
                      </IconButton>
                      Mes favoris
                    </DropdownItem>

                    <DropdownItem className="item-3" onClick={() => handleNavigation(2, "myaccount")}>
                      <IconButton
                        sx={{
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "transparent"
                          }
                        }}
                      >
                        <CustomSVG size={20}>
                          <ManageAccounts />
                        </CustomSVG>
                      </IconButton>
                      Info personnel
                    </DropdownItem>

                    <DropdownItem onClick={logOut} className="item-4">
                      <IconButton
                        sx={{
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "transparent"
                          }
                        }}
                      >
                        <CustomSVG size={20}>
                          <Logout />
                        </CustomSVG>
                      </IconButton>
                      Déconnexion
                    </DropdownItem>

                  </DropdownMenu>

                </HeaderDropdown>


                {/* <HeaderButton onClick={logOut} endIcon={<Logout />}>
                <Typography>
                  Deconnexion
                </Typography>
              </HeaderButton> */}
              </HeaderMenu>

            ) : (
              <div>
                <Link href='/register'>
                  <RegisterButton>
                    <Typography>
                      S&apos;inscrire
                    </Typography>
                  </RegisterButton>
                </Link>
                <Link href='/login'>
                  <LoginButton>
                    <Typography>
                      Se connecter
                    </Typography>
                  </LoginButton>
                </Link>
              </div>
            )
          }
        </Box>
      </HeaderContainer>
    </Header>
  )
}

export default NavbarDesktop