import { PaletteMode } from "@mui/material";

export const customTypography = {
  fontFamily: 'Quicksand',
  h1: {
    fontFamily: 'Quicksand',
    fontSize: '18px',
    fontWeight: 500
  },
  h2: {
    fontFamily: 'Quicksand',
    fontSize: '16px',
    fontWeight: 500
  },
  h3: {
    fontFamily: 'Quicksand',
    fontSize: '14px',
    fontWeight: 500
  },
  h4: {
    fontFamily: 'Quicksand',
    fontSize: '14px',
    fontWeight: 500
  },
  h5: {
    fontFamily: "Quicksand",
    fontSize: "12px",
    fontWeight: 500
  },
  body1: {
    fontFamily: 'Roboto Regular',
    fontSize: '14px',
    lineHeight: '17px'
  },
  body2: {
    fontFamily: 'Roboto Regular',
    fontSize: '12px',
    lineHeight: '16px'
  }
}

export const Styles = {
  light: {
    // palette values for light mode
    primary: {
      main: '#EEBE7F'
    },
    background: {
      default: '#FDEDD8',
      paper: '#FFFBF6',
      primary: '#FFF'
    },
    text: {
      primary: '#292929',
      secondary: '#A6A6A6',
      contrast: '#FFF'
    },
    shadow: [
      '0 .5rem 1rem rgba(0, 0, 0, .15)'
    ]
  },
  dark: {
    // palette values for dark mode
    primary: {
      main: '#EEBE7F'
    },
    background: {
      default: '#2C2C2C',
      paper: '#3E3E3E',
      primary: '#333333'
    },
    text: {
      primary: '#FFF',
      secondary: '#A6A6A6',
      contrast: '#FFF'
    },
    shadow: [
      '0 .5rem 1rem rgba(0, 0, 0, .15)'
    ]
  },
}

// export const getDesignTokens: any = (mode: PaletteMode) => ({
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//         // palette values for light mode
//         primary: {
//           main: '#EEBE7F'
//         },
//         background: {
//           default: '#FDEDD8',
//           paper: '#FFFBF6',
//           primary: '#FFF'
//         },
//         text: {
//           primary: '#292929',
//           secondary: '#A6A6A6',
//           contrast: '#FFF'
//         },
//         shadow: [
//           '0 .5rem 1rem rgba(0, 0, 0, .15)'
//         ]
//       }
//       : {
//         // palette values for light mode
//         primary: {
//           main: '#EEBE7F'
//         },
//         background: {
//           default: '#2C2C2C',
//           paper: '#3E3E3E',
//           primary: '#333333'
//         },
//         text: {
//           primary: '#FFF',
//           secondary: '#A6A6A6',
//           contrast: '#FFF'
//         },
//         shadow: [
//           '0 .5rem 1rem rgba(0, 0, 0, .15)'
//         ]
//       }),
//   },
//   typograhy: customTypography
// });
