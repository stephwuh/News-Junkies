import React, {useState} from 'react'
import './App.css';

import NewsSettings from './features/newsSettings/NewsSettings.js';
import MyNews from './features/myNews/MyNews.js';
import Signup from './features/auth/Signup.js';
import SignIn from './features/auth/SignIn.js';
import NavBar from './features/nav/NavBar';

import {Routes, Route} from 'react-router-dom'; 

import theme from './features/misc/theme.js'
import { ThemeProvider } from '@mui/material/styles';



function App() {

  const [category, setCategory] = useState('latest')

  const handleCategory = (category) => {

    setCategory(category)

  }


  return (
    <div>

      <ThemeProvider theme={theme}>
        <NavBar category={handleCategory}/>
        <Routes>
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/sign-up' element={<Signup/>} />
          <Route path='/settings' element={<NewsSettings/>}/>
          <Route path='/my-news' element={<MyNews category={category}/>} />
        </Routes>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
