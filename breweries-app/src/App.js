import './App.css';
import React, { useState, useEffect } from 'react' //for testing use state before creating component
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import NavBar from './components/NavBar';
import BreweryPage from './components/BreweryPage';
import Search from './components/Search';
import NoResults from './components/NoResults';

function App() {

  const URL = 'https://api.openbrewerydb.org/breweries'
  const [searchBrews, setSearchBrews] = useState('');

  return (
    <div className="App">
      <div>
        <NavBar URL={URL} searchBrews={searchBrews} setSearchBrews={setSearchBrews}/>
      </div>
      <Routes>
        <Route path='/' element={<Home URL={URL}/>} />
        <Route path='/search' element={<Search searchBrews={searchBrews} setSearchBrews={setSearchBrews}/>} />
        <Route path='/no_results' element={<NoResults />} />
        <Route path='/:id' element={<BreweryPage URL={URL}/>} />
      </Routes>
    </div>
  );
}

export default App;
