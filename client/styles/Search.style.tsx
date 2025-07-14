import { Button } from "@mui/material"
import styled from "styled-components"

export const SearchPage = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  min-height: 100vh;
`
export const SearchPageContainer = styled.div`
  padding: 0 50px;
  padding-bottom: 50px;
  padding-top: 200px;

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`
export const SearchHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  p {
    font-size: 24px;
    font-family: 'Quicksand', 'Roboto', sans-serif;
    font-weight: 500;
  }

  span {
    font-family: 'Pacifico', cursive;
  }
`
export const FilterButton = styled.div`
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`

export const FilterRecipe = styled.div<{ isHidden: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 700px;
  max-height: ${({ isHidden }) => !isHidden ? `300px` : 0};
  transition: ${({ isHidden }) => !isHidden ? `max-height 0.3s ease-in;` : 'max-height 0.3s ease-out'};
  overflow: hidden;
  
`
export const FilterColumn = styled.div`
  flex: 0 0 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    text-align: center;
    font-size: 16px;
  }

  .filter {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    /* button {
      margin-bottom: 10px;
      background: ${({ theme }) => theme.palette.primary.main};
      color: white;
      border: none;
      border-radius: 20px;
      padding: 10px;
      width: 100px;
      cursor: pointer;
      transition: all ease-in-out .3s;
    } */

    /* .active-filter {
      background: white;
      color:${({ theme }) => theme.palette.primary.main};
      border: 2px solid ${({ theme }) => theme.palette.primary.main};
    } */
  }
`

export const FilterTypeButton = styled(Button) <{ $isActive: boolean }>`
  margin-bottom: 10px;
  background: ${({ theme, $isActive }) => $isActive ? theme.palette.background.primary : theme.palette.primary.main};
  color: ${({ theme, $isActive }) => $isActive ? theme.palette.primary.main : theme.palette.text.contrast};
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 400;
  border: ${({ theme, $isActive }) => $isActive ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent'};
  border-radius: 10px;
  padding: 10px;
  width: 120px;
  cursor: pointer;
  transition: all ease-in-out .3s;

  &:hover {
    background: ${({ theme, $isActive }) => $isActive ? theme.palette.background.default : theme.palette.primary.main};
    filter: brightness(0.9);
  }
`

export const GridRecipes = styled.div`
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