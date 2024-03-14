import { ToastContainer } from 'react-toastify';
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
// import {Theme} from "@material-ui/core";
// import {Theme} from "@material-ui/core";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const {setBasket} =useStoreContext();
  const [loading, setLoading]=useState(true);
  useEffect(()=>{
    const buyerId=getCookie('buyerId');
    if(buyerId) {
      agent.Basket.get()
        .then(basket=>setBasket(basket))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false))
    }
  },[setBasket])
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

  if(loading) return <LoadingComponent message='Initialising app ...' />
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
