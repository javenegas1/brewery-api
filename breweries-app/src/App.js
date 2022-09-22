import './App.css';
import React, { useState, useEffect } from 'react' //for testing use state before creating component
import { Route, Routes } from "react-router-dom";
import { setUserToken, clearUserToken, getUserToken } from './storage/authToken'

import Home from './components/Home';
import NavBar from './components/NavBar';
import BreweryPage from './components/BreweryPage';
import Search from './components/Search';
import NoResults from './components/NoResults';
import AboutBeer from './components/AboutBeer';
import Editorial from './components/Editorial';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {

  const URL = 'https://api.openbrewerydb.org/breweries'
  const backendURL= 'http://localhost:4000'

  const [searchBrews, setSearchBrews] = useState('');
  const [currUser, setCurrUser] = useState()
  const [authState, setAuthState] = useState(false)

  //new user registrations after info is retrieved from form
  const handleRegister = async (info) => {
    try{
      const options = {
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

  //login returning user after validating info received from form
  const handleLogin = async (info) => {
    try{
      const options = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json"
        }
      }

      const user = await fetch(backendURL+'/auth/login', options)
      const authUser = await user.json()
      console.log(authUser)
      console.log(authUser.user)
      console.log(authUser.isLoggedIn)

      setUserToken(authUser.token);
      setCurrUser(authUser.user);
      setAuthState(authUser.isLoggedIn);
    } catch (error){
        clearUserToken();
        setCurrUser(null);
        setAuthState(false);
      console.log(error)
    }
  }

  const handleLogout = () => {
    console.log(currUser)
    console.log(authState)
    clearUserToken();
    setCurrUser(null);
    setAuthState(false);
  };

  return (
    <div className="App">

      <div> 
        <NavBar URL={URL} searchBrews={searchBrews} setSearchBrews={setSearchBrews} handleLogout={handleLogout} currUser={currUser} authState={authState}/>
      </div>

      <Routes>
        <Route path='/' element={<Home URL={URL} />} />
        <Route path='/search' element={<Search searchBrews={searchBrews} setSearchBrews={setSearchBrews}/>} />
        <Route path='/no_results' element={<NoResults />} />
        <Route path='/about-beer' element={<AboutBeer />} />
        <Route path='/editorial' element={<Editorial />} />
        <Route path='/:id' element={<BreweryPage URL={URL} backendURL={backendURL} currUser={currUser}/>} />
        <Route path='/register' element={<Register handleRegister={handleRegister}/>} />
        <Route path='/login' element={<Login handleLogin={handleLogin}/>} />
        <Route path='/profile' element={<Profile currUser={currUser} authState={authState}/>} />


      </Routes>
    </div>
  );
}

export default App;
