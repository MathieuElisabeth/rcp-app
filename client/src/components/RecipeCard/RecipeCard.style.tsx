import { Card, Chip } from "@mui/material"
import styled, { css } from "styled-components"

export const RecipeCardContainer = styled(Card)`
  position: relative;
  height: 320px;
  width: 220px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  overflow: hidden;

  .MuiCardContent-root {
    padding: 0 10px;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.background.paper};
  }

  .recipe-name {
    font-size: 18px;
    font-family: 'Quicksand', 'Roboto';
    font-weight: 500;
    text-align: center;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .preparation-time {
    position: relative;

    svg {
      position: absolute;
      right: -25px;
      top: 50%;
      transform: translate(0, -50%);
      height: 18px;
      width: 18px;
    }
  }

  .price {
    svg {
      color: rgb(167, 167, 167);
      margin: 0;
    }
  }

  .author {
    margin-left: 5px;
    text-decoration: underline;
    cursor: pointer;
  }

  .MuiCardActions-root {
    position: absolute;
    bottom: 0;
    width: 100%;
    justify-content: space-between;
    /* padding: 0 8px; */

    .recipe-control {
      margin-left: 10px;

      svg {
        margin: 0 5px;
        color: rgb(113, 113, 113);

      }
    }

    svg {
      height: 25px;
      width: 25px;
      cursor: pointer;
    }
  }
`

// const ActiveLike = css`
//   transition-duration: 1s;
//   background-position: -2800px 0;
// `

export const RecipeInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  text-transform: capitalize;

  svg {
    height: 14px;
    width: 14px;
    color: ${({ theme }) => theme.palette.divider};
    margin: 0 5px;
  }
`

export const ChipePlatType = styled(Chip) <{ $colorTag: string }>`
  position: absolute;
  top: 10px;
  left: 15px;
  background: ${({ theme }) => theme.palette.background.primary};
  color: ${({ $colorTag }) => $colorTag};
  border-color: ${({ $colorTag }) => $colorTag};
  width: fit-content;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => `linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, ${theme.palette.background.paper} 100%)`} ;
`