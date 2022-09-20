import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function NavBar(props) {
  //search function
  //takes input field and appends it to API url
  //no results found if input does not match one of the
  //else 'no results found'

  const [searchBrews, setSearchBrews] = useState('');
  let navigate = useNavigate()

  const handleChange = (event) => {
    setSearchBrews(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        if(searchBrews !==''){
            let resCity = await fetch(props.URL+`?by_city=${searchBrews}&per_page=50`)
            let resState = await fetch(props.URL+`?by_state=${searchBrews}&per_page=50`)
            let resZipCode = await fetch(props.URL+`?by_postal=${searchBrews}&per_page=50`)

            const breweriesCity = await resCity.json()
            const breweriesState = await resState.json()
            const breweriesZipCode = await resZipCode.json()

            let finalSearch = breweriesCity.concat(breweriesState, breweriesZipCode)

            //no breweries found test case ---->
            // if(finalSearch.length > 0){
            //     console.log(finalSearch)

            // } else {
            //     console.log('no breweries found')
            // }

            if(finalSearch.length > 0){
                props.setSearchBrews(finalSearch)
                navigate('/search')

            } else {
                navigate('/no_results')
            }
          }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
        <ul>
            <Link to='/'>
                <li>Home</li>
            </Link>
            <li>
                <form onSubmit={handleSubmit}  >
                    <input type='text' placeholder='State, City, ZipCode' name='search' onChange={handleChange}></input>
                    <button type='submit' hidden>Search</button>
                </form>
            </li>
        </ul>
    </div>
  )
}