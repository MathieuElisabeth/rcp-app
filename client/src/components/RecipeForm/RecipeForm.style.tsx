import { Paper } from "@mui/material"
import styled from "styled-components"
import { ActionButton, InputForm, UserInfoForm } from "../../../styles/GlobalStyles"

export const PaperForm = styled(Paper)`
  padding: 50px;
  border-radius: 10px;
`

export const RecipeFieldForm = styled(UserInfoForm)`
  .quantity {
    max-width: 60px;

    input {
      padding: 10px 10px;
    }

    @media screen and (max-width: 480px) {
      flex-direction: column;
    }
  }

  .MuiIconButton-root {
    height: fit-content;
  }
`

export const DropdownsFormList = styled.div`
  display: flex;
  text-transform: capitalize;


  @media screen and (max-width: 630px) {
    flex-direction: column;
    align-items: center;
  }
`
export const IngredientsFormList = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 630px) {
    flex-direction: column;
  }
`

export const StepArea = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    ${InputForm} {
      margin: 0 20px;
      width: 100%
    }
`

export const AddItemButton = styled(ActionButton)`
  text-transform: none;
  width: fit-content;
  max-width: unset;
  font-size: 14px;

  @media screen and (max-width: 630px) {
    margin: auto;
  }
`
export const RecipeImage = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    display: none;
  }
`
export const ImageInput = styled.label`
  position: relative;
  cursor: pointer;
  vertical-align: middle;
  text-decoration: none;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.text.contrast};
  background-color: ${({ theme }) => theme.palette.primary.main};
  line-height: 1.75;
  letter-spacing: 0.02857em;
  min-width: 64px;
  padding: 6px 8px;
  margin: 10px 0;
  border-radius: 10px;
  width: fit-content;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba( 0 , 0 , 0 , 0.5 );

  .image-menu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    svg {
      cursor: pointer;
      margin: 0 10px;
      color: white;
    }
  }
`