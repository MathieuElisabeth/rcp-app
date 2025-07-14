import { Paper } from "@mui/material"
import styled from "styled-components"
import { ActionButton, InputForm } from "./GlobalStyles"

export const RecipePaper = styled(Paper)`
 border-radius: 10px;
 background: ${({ theme }) => theme.palette.background.paper};
`
export const RecipeHeader = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 10px 10px 0;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

export const RecipeTitle = styled.div`
  position: absolute;
  bottom: 0;
  padding: 50px 0;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 36px;
  color: ${({ theme }) => theme.palette.text.primary};
  width: 100%;
  text-align: center;
  z-index: 1;

  @media screen and (max-width: 820px) {
    font-size: 26px;
  }
`

export const RecipeHeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => `linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, ${theme.palette.background.paper} 100%)`} ;
`
export const RecipeInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  padding: 0 20px;

  .recipe-properties {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .recipe-author {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .main-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex: 0 0 33%;

    span {
      font-weight: bold;
    }

    p {
      margin: 0;
      text-transform: capitalize;
    }

  }


  @media screen and (max-width: 780px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
    text-align: center;

    .recipe-author {
      justify-content: center;
    }
  }
  
`

export const IngredientContainer = styled.div`
  position: sticky;
  top: 50px;
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex: 0 0 30%;
  height: fit-content;
`

export const IngredientItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between ;
  padding: 10px 15px;
  
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  }

  span {
    margin-right: 5px;
  }
`

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 10px;
`

export const StepItem = styled.div`
  display: flex;
  margin: 10px 0;
  padding: 10px;
  background: ${({ theme }) => theme.palette.background.primary};
  color: ${({ theme }) => theme.palette.text.primary};
  word-break: break-word;
  white-space: break-spaces;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.palette.shadow[0]};
  min-width: 100%;

  .number-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-basis: 10%;
  }

  .number {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.text.contrast}
  }

  .description {
    padding: 10px 15px;
  }
`

export const RecipePreparationContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 100px 0;
  padding: 0 50px;

  @media screen and (max-width: 780px) {
      flex-direction: column;

      ${IngredientContainer} {
        position: unset;
      }
    }
`

export const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  padding-bottom: 50px;

  ${ActionButton} {
    color: ${({ theme }) => theme.palette.text.contrast};
  }


  .comments {
    margin: 20px 10px;
    font-weight: bold;
  }

  .login-msg {
    margin: 0 10px;
  }
`

export const CommentInput = styled(InputForm)`
  margin-bottom: 10px;
  max-width: none;
`

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  margin: 5px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};

  span {
    font-weight: bold;
  }
`

export const CommentTitle = styled.div`
  font-size: 18px;
  margin: 10px;
`