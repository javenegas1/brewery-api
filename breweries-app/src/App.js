import './App.css';
import React, { useState, useEffect, useNavigate } from 'react' //for testing use state before creating component
import { Route, Routes } from "react-router-dom";
import { setUserToken, clearUserToken, getUserToken } from './storage/authToken'

import Home from './components/Home';
import NavBar from './components/NavBar';
import BreweryPage from './components/BreweryPage';
import Search from './components/Search';
import NoResults from './components/NoResults';
import Register from './components/Register';

function App() {

  const URL = 'https://api.openbrewerydb.org/breweries'
  const backendURL= 'http://localhost:4000'
  const [searchBrews, setSearchBrews] = useState('');

  //new user registrations after info is retrieved from form
  const handleRegister = async (info) => {
    try{
      console.log(info)
      const options ={
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json"
        }
      }

      const newUser = await fetch(backendURL+'/auth/register', options)
      const parsedUser = await newUser.json()
      console.log(parsedUser)
      
    } catch (error){
      console.log(error)
    }
  }

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
        <Route path='/register' element={<Register handleRegister={handleRegister}/>} />
      </Routes>
    </div>
  );
}

export default App;
