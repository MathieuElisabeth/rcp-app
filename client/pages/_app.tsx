import { AppProps, AppContext } from 'next/app'
import { useEffect, useMemo, useState, useRef } from 'react';
import { createTheme, ThemeProvider as MUiThemeProvidder, PaletteMode, useMediaQuery } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
// import { getDesignTokens } from '../styles/styles';
import GetDesignTokens from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ColorModeContext } from '../config/color-contex';
import createEmotionCache from '../src/createEmotionCache';
import { parseCookies } from '../src/lib/utils';
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';
import CssBaseline from '@mui/material/CssBaseline';
// import { theme } from '../styles/theme';
// import { theme as defaultTheme } from '../src/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  themeSetting: PaletteMode;
}

function MyApp(props: MyAppProps) {
  const [mode, setMode] = useState<PaletteMode>(
    props.themeSetting || 'light'
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );
  const [cookies, setCookie] = useCookies(['cookieColorMode']);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isBrowser = typeof window !== 'undefined';

  const addDays = (date: Date, days: number) => {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  };

  useEffect(() => {
    if (prefersDarkMode && !!cookies.cookieColorMode !== true) {
      setMode('dark');
    }
  }, [prefersDarkMode, cookies.cookieColorMode]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const date = new Date();
    const expires = addDays(date, 365);
    setCookie('cookieColorMode', mode, { path: '/', expires, secure: true });
  }, [mode, setCookie]);

  // useEffect(() => {
  //   const colorSetting = cookies.cookieColorMode;
  //   if (colorSetting) setMode(colorSetting as PaletteMode);
  // }, [cookies.cookieColorMode]);

  const theme = useMemo(() => createTheme(GetDesignTokens(mode)), [mode]);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // useEffect(() => {
  //   localStorage.setItem('theme', mode)
  // }, [mode])

  // Update the theme only if the mode changes
  // const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  // const theme = useMemo(() => defaultTheme(mode),[mode]);

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ColorModeContext.Provider value={colorMode}>
          <MUiThemeProvidder theme={theme}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <CookiesProvider
                cookies={isBrowser ? undefined : new Cookies(cookies)}
              >
                <Component {...pageProps} />
              </CookiesProvider>
            </ThemeProvider>
          </MUiThemeProvidder>
        </ColorModeContext.Provider>
      </Provider>
    </CacheProvider>
  )
}

export default MyApp

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  let themeSetting;
  if (ctx.req && ctx.req.headers.cookie) {
    themeSetting = parseCookies(ctx).cookieColorMode;
  }
  return {
    themeSetting,
  };
};
