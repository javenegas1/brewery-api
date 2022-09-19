import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

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
    </div>
  )
}
