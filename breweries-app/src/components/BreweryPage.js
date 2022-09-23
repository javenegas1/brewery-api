import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, json } from 'react-router-dom'
import { getUserToken } from '../storage/authToken'
import Button from 'react-bootstrap/Button';

export default function BreweryPage(props) {

  const[thisBrewery, setThisBrewery] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  //------------------------------------------------------>
  //fetch individual brewery information
  const getBrewery = async () => {
    try{
        const res = await fetch(props.URL+`/${params.id}`)
        const brewery = await res.json()
        setThisBrewery(brewery)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {getBrewery()}, []);

  //------------------------------------------------------>
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
    }catch(err){
      console.log(err)
    }
  }

  //------------------------------------------------------>
  //form functions for comments section
  
  const[newComment, setNewComment] = useState({ brewery: params.id, comment:'', time: '' })

  function handleChange(e) {
    setNewComment({...newComment, [e.target.name]: e.target.value});
  }

  async function handleComment(e) {
    e.preventDefault();
    newComment.time = determineDate()
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
    //------------------------------------------------------>
    //fetch comments made on this brewery page
    const [breweryComments, setBreweryComments] = useState([])
    const paramId = params.id
    const getBreweryComments = async () => {

      try{
          const options = { 
              method: 'GET',
            }
          const res = await fetch(props.backendURL+`/main/brewery-comments/${paramId}`, options)
          const commentsList = await res.json()
          console.log(commentsList)
          setBreweryComments(commentsList)
      } catch (error) {
          console.log(error)
      }
    }

  useEffect(() => {getBreweryComments()}, []);

  //------------------------------------------------------>
  //delete coments
  const handleDeleteComment = async (commentId) => {
    try{
      const options = {
        method: "DELETE",
        headers: { Authorization: `bearer ${getUserToken()}` },
      };
      const res = await fetch(props.backendURL+`/main/comment/${commentId}`, options)
      const deletedComment = await res.json()
      console.log(deletedComment)
    } catch(error){
      console.log(error)
    }
  }

//------------------------------------------------------>
//date for comments
  const determineDate = () => {
    let commentDate = new Date()
    
    let day = commentDate.getDate()
    let month = commentDate.getMonth()
    let year = commentDate.getFullYear()
    let hour = commentDate.getHours()
    
    if(month === 0) month = 'Jan.'
    else if(month === 1) month = 'Feb.'
    else if(month === 2) month = 'March'
    else if(month === 3) month = 'April'
    else if(month === 4) month = 'May'
    else if(month === 5) month = 'June'
    else if(month === 6) month = 'July'
    else if(month === 7) month = 'Aug.'
    else if(month === 8) month = 'Sept.'
    else if(month === 9) month = 'Oct.'
    else if(month === 10) month = 'Nov.'
    else if(month === 11) month = 'Dec.'
    
    if(hour>12){
      hour = `${hour-12}:00 pm`
    } else {
      hour = `${hour}:00 am`
    }
    
     return `${month} ${day}, ${year} at around ${hour}`
  }


  if (!thisBrewery || !breweryComments) {
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
          <input 
          type='hidden'
          name='time'
          onChange={handleChange}
          value={newComment.time}
          />
        {/* <button onClick={handleComment} >Comment</button> */}
        <Button variant='warning' onClick={handleComment}>Comment</Button>
        </div>

      <div>
      <h3>Comments Section</h3>
        {breweryComments.map((oneComment) => {
            return(
                  <div>
                    <li>{oneComment.comment} <span>by {oneComment.username}</span> - <span>{ oneComment.time }</span></li>
                    {/* <button onClick={handleDeleteComment(oneComment._id)} >Delete Comment</button> */}
                  </div>
            )
        }).reverse()}
      </div>

    </div>
  )
}
