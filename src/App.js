import React from 'react'
import './App.css';

import NewsSettings from './features/newsSettings/NewsSettings.js';
import MyNews from './features/myNews/MyNews.js';
import Signup from './features/auth/Signup.js';
import SignIn from './features/auth/SignIn.js';
import NavBar from './features/nav/NavBar';

import {Routes, Route} from 'react-router-dom'; 

import theme from './features/misc/theme.js'
import { ThemeProvider } from '@mui/material/styles';

import {GlobalProvider} from './features/GlobalState.js'



function App() {

  return (
    <div>

      <ThemeProvider theme={theme}>
        <GlobalProvider>
          <NavBar/>
          <Routes>
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/sign-up' element={<Signup/>} />
            <Route path='/settings' element={<NewsSettings/>}/>
            <Route path='/my-news' element={<MyNews/>} />
          </Routes>
        </GlobalProvider>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
