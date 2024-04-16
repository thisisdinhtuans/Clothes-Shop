import { ToastContainer } from 'react-toastify';
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
// import {Theme} from "@material-ui/core";
// import {Theme} from "@material-ui/core";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync } from '../../features/basket/basketSlice';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import HomePage from '../../features/home/HomePage';

function App() {
  const location=useLocation();
  const dispatch=useAppDispatch();
  const [loading, setLoading]=useState(true);

  const initApp =useCallback(async()=> {
    try{
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch(error:any) {
      console.log(error);
    }
  },[dispatch])

  useEffect(()=>{
    initApp().then(()=>setLoading(false));
  },[initApp])

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
      {
        loading ? <LoadingComponent message='Initialising app ...' /> :location.pathname==='/' ? <HomePage />
        : <Container sx={{mt:4}}>
          <Outlet />
        </Container>
      }
    </ThemeProvider>
  )
}

export default App
