import styled from "styled-components"
import { Button, IconButton, Input, Tab, Tabs, TextField } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react';

// Login/Register page
export const AuthPage = styled.div`
  display: flex;
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0 auto;
  min-height: 100vh;
  /* max-width: 700px; */
  /* margin-top: 160px; */
`

export const AuthContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`

export const Tagline = styled.div`
  flex: 0 0 50%;
  font-family: 'Quicksand';
  font-size: 36px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};;
  /* color: black; */

  p {
    max-width: 300px;
    margin: 65px auto;
  }

  span {
    font-family: 'Pacifico', cursive;
    font-size: 48px;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`

export const ActionButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.text.contrast};
  font-size: 18px;
  border-radius: 10px;
  border: none;
  max-width: 200px;
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #eebe7f9a !important;
  }
`

export const Divider = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.divider};
  height: 500px;

  @media screen and (max-width: 767px) {
    display: none;
  }
`

export const ErrorMessage = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.error.main};
  margin: 5px;
`
export const CustomSVG = styled.div<{ size?: number, color?: string }>`
  svg {
    height: ${({ size }) => size ? `${size}px` : 'inherit'};
    width: ${({ size }) => size ? `${size}px` : 'inherit'};
    color: ${({ color }) => color ? color : 'inherit'};
  }
`
// Home page
export const HomePage = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  min-height: 100vh;
`

export const HomePageContainer = styled.div`
  padding: 0 50px;
  padding-bottom: 50px;
  padding-top: 200px;
  /* margin: 0 auto; */

  @media screen and (max-width: 540px) {
    padding-right: 0 10px;
    padding-left: 0 10px;
  }
`

export const HomePageHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  p {
    font-size: 24px;
    font-family: 'Quicksand', 'Roboto';
    font-weight: 500;
  }

  span {
    font-family: 'Pacifico', cursive;
  }

  @media screen and (max-width: 540px) {
    padding: 0 10px;

    p {
      text-align: center;
    }
  }
  
`

export const SearchContainer = styled.div`
  display: flex;
  margin: 20px 0;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: 18px;
    background-color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 30px;
    padding: 0 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: none;
    cursor: pointer;
  }
`

export const InputSearch = styled(Input)`
  width: 400px;
  height: 40px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.palette.background.primary};
  margin-bottom: 30px;
  padding: 0 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: none;

  @media screen and (max-width: 540px) {
    width: 255px;
  }
  
`
export const SwiperHeader = styled.div`
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 24px;
  font-family: 'Quicksand', 'Roboto';
  font-weight: 500;
`

export const RecipesSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: visible;

  .swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-button-prev, &.swiper-container-rtl .swiper-button-next {
      left: -16px;
      right: auto;
  
  }

  .swiper-button-next, &.swiper-container-rtl .swiper-button-prev {
      right: -16px;
      left: auto;
  }

  .swiper-button-prev, .swiper-button-next {
  top: 45%;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.palette.background.primary};
  border: 1px solid gray;
  border-radius: 50%;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 700;
  outline: 0;
  transition: background-color .2s ease, color .2s ease;
  
  &::after {
      font-size: 16px;
  }
}

.swiper-button-prev {
  &:after {
      position: relative;
      left: -1px;
  }
}

.swiper-button-next {
  &:after {
      position: relative;
      left: 1px;
  }
}

/* .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
  left: 10px;
  right: auto;
}

.swiper-button-next, .swiper-container-rtl .swiper-button-prev {
  right: 10px;
  left: auto;
} */

.swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled {
  opacity: 0;
  cursor: auto;
  pointer-events: none;
}
`

// Account page
export const AccountPage = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  min-height: 100vh;
`
export const AccountContainer = styled.div`
  padding: 65px 0;

  .MuiTabs-indicator {
    width: 5px !important;
    border-radius: 0 5px 5px 0;
  }
`

export const CustomTabs = styled(Tabs)`
  padding-top: 60px;
  height: 100%;
  position: fixed;

  @media screen and (max-width: 820px) {
    display: none;
  }
`

export const CustomTab = styled(Tab) <{ $isActive: boolean }>`
  justify-content: space-between;
  background-color: ${({ theme, $isActive }) => $isActive ? (theme.palette.mode === 'dark' ? '#202020' : 'white') : 'none'};
  font-family: 'Quicksand';
  font-weight: 500;
`

export const ContentTab = styled.div`
  position: relative;
  flex: 0 0 84%;
  margin-left: auto;

  @media screen and (max-width: 820px) {
    flex: 1;
  }
`

export const LogoutButton = styled(Button)`
  position: fixed;
  bottom: 0;
  padding: 12px 16px;
  font-family: 'Quicksand';
  font-weight: 500;
  color: red;
`
export const AccountHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 32px;
  font-family: 'Pacifico', cursive;
  font-weight: bold;
`
export const RecipesContainer = styled.div`
  display: grid;
  padding-top: 50px;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  justify-items: center;

  @media screen and (max-width: 1180px) {
    grid-template-columns: repeat(2, 1fr);

  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr)

  }

  .recipes {
    padding: 60px 40px;
    width: 100%;

    @media screen and (max-width: 820px) {
      padding-right: 10px;
      padding-left: 10px;

    }
  }
  
`

export const RecipesLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`

// padding: 60px 40px;
// width: 100%;

export const InfoUserContainer = styled.div`
  padding: 60px 40px;
  width: 100%;

  @media screen and (max-width: 820px) {
    padding-right: 10px;
    padding-left: 10px;

  } 
`

export const UserInfoForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;

  .MuiBox-root {
    display: flex;
    align-items: center;
  }

  .fullwidth {
    max-width: unset;
  }

  svg {
    cursor: pointer;
  }
`

export const InputForm = styled(TextField)`
  background-color: ${({ theme, disabled }) => disabled ? 'inherit' : `${theme.palette.background.primary}`};
  margin-right: 20px;
  max-width: 230px;

  input {
    padding: 10px 14px;
  }

  fieldset {
    border: ${({ disabled }) => disabled ? 'none' : '1px solid'};
  }
`

export const UserInfoTitle = styled.div`
  font-size: 22px;
  font-family: 'Quicksand';
  font-weight: 500;
  margin: 5px 0;
`

export const SavePasswordButton = styled(ActionButton)`
  font-size: 0.875rem;
  max-width: none;
`

export const DeleteSection = styled.div`
  padding: 10px 40px;
  width: 100%;
`

export const DeleteAccountButton = styled(Button)`
  font-family: 'Quicksand';
  font-weight: 500;
  max-width: fit-content;
  background: red;
  color: white;
  margin-top: 10px;

  &:hover {
    background: red;
  }
`
// Create/Update Recipe

export const EditRecipePage = styled.div`
  padding: 90px 85px;
  background: ${({ theme }) => theme.palette.background.default};

  @media screen and (max-width: 600px) {
    padding: 60px 0;
  }
`

//User page
export const UserPage = styled.div`
  display: flex;
  background: ${({ theme }) => theme.palette.background.default};
  margin: 0 auto;
  min-height: 100vh;
`
export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 65px;
`
export const UserHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 32px;
  font-family: 'Pacifico', cursive;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
`

export const UserGridRecipes = styled.div`
  margin-top: 50px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-content: center;

  @media screen and (max-width: 1060px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 560px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

// Recipe page
export const RecipePage = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  min-height: 100vh;
  padding: 90px 85px;

  @media screen and (max-width: 600px) {
    padding: 60px 0;
  }
`
export const RecipeContainer = styled.div`
  padding: 0;
`

// Page 4004

export const NotFound = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 520px;
  width: 100%;
  text-align: center;
  line-height: 1.4;
  h2 {
    font-family: 'Quicksand', sans-serif;
    font-size: 22px;
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
    color: #232323;
  }

  p {
    font-family: 'Roboto', sans-serif;
    color: #787878;
    font-weight: 300;
  }

  button {
    margin: auto;
  }

  a {
    text-transform: initial;
  }
`


export const NotFound404 = styled.div`
  height: 190px;

  h1 {
    font-family: 'Quicksand', sans-serif;
    font-size: 146px;
    font-weight: 700;
    margin: 0px;
    color: #232323;
  }

  span {
    display: inline-block;
    width: 120px;
    height: 120px;
    background-image: url("/asset/images/emoji.webp");
    background-size: cover;
    transform: scale(1.4);
  }
`