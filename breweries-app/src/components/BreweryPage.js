import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserToken } from '../storage/authToken'

export default function BreweryPage(props) {

  const[thisBrewery, setThisBrewery] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

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
  
  const[newComment, setNewComment] = useState({ brewery: params.id, comment:'' })

  function handleChange(e) {
    setNewComment({...newComment, [e.target.name]: e.target.value});
  }

  async function handleComment(e) {
    e.preventDefault();
    let info = {
      comment: newComment,
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${getUserToken()}`
        }
      }
      const response = await fetch(props.backendURL+'/main/comment', options)
      const parsedResponse = await response.json()
      console.log(parsedResponse)
      console.log(newComment)
      setNewComment({brewery: params.id, comment:''})
    } catch(error){
      console.log(error)
      navigate('/login')
    }
  }

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
          <input
            type="text"
            name="comment"
            placeholder="say something..."
            onChange={handleChange}
            value={newComment.comment}
        />
        <button onClick={handleComment} >Comment</button>
        </div>

    </div>
  )
}
