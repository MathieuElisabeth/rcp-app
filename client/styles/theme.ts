import { createTheme } from "@mui/material";
import { PaletteMode } from '@mui/material';
import { customTypography, Styles } from './styles';
// import { getDesignTokens } from "./styles";

// export const theme = createTheme(getDesignTokens('light'));
// export const theme = (mode = 'light') => createTheme(getDesignTokens(mode));


const GetDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? Styles.light : Styles.dark),
  },
  typograhy: customTypography
});

export default GetDesignTokens;
