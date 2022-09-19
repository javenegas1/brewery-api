import './App.css';
import React, { useState, useEffect } from 'react' //for testing use state before creating component
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import NavBar from './components/NavBar';
import BreweryPage from './components/BreweryPage';

function App() {

  const URL = 'https://api.openbrewerydb.org/breweries'

  return (
    <div className="App">
      <div>
        <NavBar URL={URL}/>
      </div>
      <Routes>
        <Route path='/' element={<Home URL={URL}/>} />
        <Route path='/:id' element={<BreweryPage URL={URL}/>} />
      </Routes>
    </div>
  );
}

export default App;
