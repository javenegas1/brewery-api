import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getUserToken } from '../storage/authToken'

export default function BreweryPage(props) {

  const[thisBrewery, setThisBrewery] = useState(null)
  const[newComment, setNewComment] = useState({username: '', comment: '', brewery: ''})
  const params = useParams()
  
  //fetch individual brewery information
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

  //send brewery into favorites array for user
  async function handleFavorites(e) {
    e.preventDefault();
    let favorite = {brewery: params.id.toString()}

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

  //form functions for comments section

  // function handleChange(e) {
  //   setNewComment({ ...newComment, [e.target.comment]: e.target.value });
  // }

  // async function handleComment(e) {
  //   e.preventDefault();
  //   let info = {
  //     comment: newComment,
  //     brewery: params.id.toString(),
  //   }
  //   try {
  //     const options = {
  //       method: 'POST',
  //       body: JSON.stringify(info),
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `bearer ${getUserToken()}`
  //       }
  //     }
  //     const response = await fetch(props.backendURL+'/main/comment', options)
  //     const parsedResponse = await response.json()
  //     console.log(parsedResponse)
  //     console.log(newComment)
  //   } catch(error){
  //     console.log(error)
  //   }
  // }

  if (!thisBrewery) {
    return <p>Loading ...</p>
  }

  return (
    <div>
        <ul>
            <li>{thisBrewery.name}</li>
            <li>{thisBrewery.street}</li>
            <li>{thisBrewery.city}, {thisBrewery.state}</li>
            <li>{thisBrewery.website_url}</li>
            <li>{thisBrewery.phone}</li>
        </ul>
        <button onClick={handleFavorites}>Favorite</button>

        <div>
          form for comments
        </div>

    </div>
  )
}
