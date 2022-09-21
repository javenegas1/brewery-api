import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getUserToken } from '../storage/authToken'

export default function BreweryPage(props) {

  const[thisBrewery, setThisBrewery] = useState(null)
  const params = useParams()
  
  const getBrewery = async () => {
    try{
        const res = await fetch(props.URL+`/${params.id}`)
        const brewery = await res.json()
        console.log(brewery)
        setThisBrewery(brewery)
    } catch (error) {
        console.log(error)
    }
  }

  async function handleFavorites(e) {
    e.preventDefault();
    let favorite = {brewery: params.id.toString()}
    console.log(favorite)
    try {
      const options = { 
        method: 'POST',
        body: JSON.stringify(favorite),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${getUserToken()}`
        }
      }
      const response = await fetch(props.backendURL+'/main/favorites', options)
      const parsedResponse = await response.json()
      console.log(parsedResponse)
      console.log(props.currUser)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {getBrewery()}, []);

  if (!thisBrewery) {
    return <p>Loading ...</p>
  }

  return (
    <div>
        <ul>
            <li>{thisBrewery.name}</li>
            <li>{thisBrewery.city}</li>
            <li>{thisBrewery.country}</li>
            <li>{thisBrewery.website_url}</li>
            <li>{thisBrewery.phone}</li>
        </ul>
        <button onClick={handleFavorites}>Favorite</button>
    </div>
  )
}
