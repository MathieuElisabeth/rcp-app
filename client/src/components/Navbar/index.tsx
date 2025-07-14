import { useMediaQuery, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import { ColorModeContext } from "../../../config/color-contex"



function Navbar({ setTabsValue }: { setTabsValue?: Function }) {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext);
  const [isMounted, setIsMounted] = useState(false)
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth);
  const isMobile = useMediaQuery('(max-width:600px)');


  useEffect(() => {
    setIsMounted(true)
  }, [])


  if (isMounted) {
    if (isMobile) {
      return (
        <NavbarMobile
          isLoggedIn={auth.isLoggedIn}
          setTabsValue={setTabsValue}
          colorMode={colorMode}
          theme={theme}
        />
      )
    }
    return <NavbarDesktop isLoggedIn={auth.isLoggedIn} colorMode={colorMode} theme={theme} />
  }

  return null
}

export default Navbar