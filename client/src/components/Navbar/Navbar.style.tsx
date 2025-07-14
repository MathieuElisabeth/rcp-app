import { BottomNavigation, Button } from "@mui/material"
import styled, { keyframes } from "styled-components"

const translateX = keyframes`
  0% {
    opacity: 0;
    transform: translateX(60px);
  }
  
  80% {
    transform: translateX(-5px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
`

export const Header = styled.header`
  position: fixed;
  background: ${({ theme }) => theme.palette.background.primary};
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  /* border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px; */
  box-shadow: ${({ theme }) => theme.palette.shadow[0]};
`

export const HeaderContainer = styled.div`
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  .toggle-theme {
    color: ${({ theme }) => theme.palette.text.primary};
    height: fit-content;
  }
`

export const HeaderLogo = styled.div`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 36px;
  font-family: 'Pacifico', cursive;
`
export const HeaderMenu = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderButton = styled(Button)`
  width: max-content;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: opacity ease-out .3s;

  &:hover {
    opacity: 0.7;
    background-color: inherit !important;
  }
`

export const RegisterButton = styled(HeaderButton)`
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.text.contrast};
  margin-right: 20px;
  &:hover {
    opacity: 0.7;
    background: ${({ theme }) => theme.palette.primary.main} !important;
  }
`

export const LoginButton = styled(HeaderButton)`
  background: ${({ theme }) => theme.palette.background.primary};
  color: ${({ theme }) => theme.palette.text.primary};
`

export const NewReciperButton = styled(RegisterButton)`
  width: fit-content;
  height: fit-content;
`
export const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 45px;
  left: -210px;
  width: 300px;
  background-color: ${({ theme }) => theme.palette.background.primary};
  perspective: 1000px;
  padding-left: 0;
  border-radius: 0px 0 5px 5px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.palette.shadow[0]};
  li {
    display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
    color: ${({ theme }) => theme.palette.text.primary};
    background: inherit;
    padding: 10px 20px;
    font-size: 16px;
    opacity: 0;
    &:hover {
      filter: brightness(0.9);  
    }
  }

  li:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  }

  .item-1 {
    animation-delay: 60ms;
  }
  .item-2 {
    animation-delay: 120ms;
  }
  .item-3 {
    animation-delay: 180ms;
  }
  .item-4 {
    animation-delay: 240ms;
  }
`

export const HeaderDropdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 18px;
  perspective: 1000px;
  z-index: 100;
  &:hover{
    cursor: pointer;
  }
  &:hover ${DropdownMenu} li{
    display: block;
  }
`
export const DropdownItem = styled.li`
  transform-origin: top center;
  animation: ${translateX} 240ms ease-in-out forwards;
`
export const HeaderMobileContainer = styled(HeaderContainer)`
  padding: 0 20px;
  ${HeaderLogo} {
    font-size: 18px
   }
`

export const NavigationMobile = styled(BottomNavigation)`
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 100;
  background: ${({ theme }) => theme.palette.background.primary};

  .MuiBottomNavigationAction-label {
    font-size: 12px;
  }
`

export const NewRecipeButton = styled.div`
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .button-add {
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid;
    border-radius: 10px;
  }
  
  @media screen and (max-width: 480px) {
    padding: 10px;
    
    .button-add {
      height: 25px;
      width: 25px;
      border-radius: 5px;
      }

    }

`

export const DrawerRegiterButton = styled(RegisterButton)`
  width: 100%;
  margin-right: 0;
`