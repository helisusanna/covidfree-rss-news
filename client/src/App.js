import React from "react";
import {useState, useEffect, } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
// MUI
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// components
import News from "./components/News";
import Footer from "./components/Footer";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#2342AD',
    },
    secondary: {
      main: '#335FFF',
    },
  },
});

function App() {
  const [news, setNews] = useState({data : [], loading:true});
  useEffect(() => {
    fetch("/api").then((res) => res.json()).then((data) => {
      setNews({data : data.news, loading:false})}) 
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {(news.loading)
      ? <Backdrop open={true}><CircularProgress color="inherit"/></Backdrop>
      : <News news={news.data}/>}
        <Footer/>
    </ThemeProvider>
  );
}
export default App;
