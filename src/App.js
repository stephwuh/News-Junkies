
import './App.css';

import NewsSettings from './features/newsSettings/NewsSettings.js';
import MyNews from './features/myNews/MyNews.js';

import {Routes, Route} from 'react-router-dom'; 


function App() {
  return (
    <div>
      <Routes>
        <Route path='/settings' element={<NewsSettings/>}/>
        <Route path='/my-news' element={<MyNews/>} />
      </Routes>
    </div>
  );
}

export default App;
