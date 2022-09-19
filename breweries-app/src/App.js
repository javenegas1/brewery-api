import './App.css';
import React, { useState, useEffect } from 'react'
import { Route, Routes, Outlet } from "react-router-dom";
import Random from './components/Random';

function App() {

  const URL = 'https://api.openbrewerydb.org/breweries'

  return (
    <div className="App">
      <Random URL={URL} />
    </div>
  );
}

export default App;
