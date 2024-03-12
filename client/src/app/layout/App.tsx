import Catalog from "../../features/catalog/Catalog";
import { ToastContainer } from 'react-toastify';
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
// import {Theme} from "@material-ui/core";
// import {Theme} from "@material-ui/core";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [darkMode, setDarkMode]=useState(false);
  const paletteType=darkMode ? 'dark':'light';
  const theme=createTheme({
    palette: {
      mode: paletteType,
      background: {
        default:paletteType==='light' ? '#eaeaea' :'#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  //đây là phần trả về component
  return (
    <ThemeProvider theme={theme}>
    {/* làm cho Header nó phủ dọc hết */}
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
