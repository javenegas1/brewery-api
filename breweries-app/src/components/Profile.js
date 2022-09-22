import React, {useState, useEffect} from 'react'
import { getUserToken } from '../storage/authToken'
import { Link } from "react-router-dom";

export default function Profile(props) {
    const [profile, setProfile] = useState(null)
    const [userComments, setUserComments] = useState([])

    //fetch basic profile details
    const getProfile = async () => {
        try{
            const options = { 
                method: 'GET',
                headers: {
                  "Authorization": `bearer ${getUserToken()}`
                }
              }
            const res = await fetch(props.backendURL+'/main/profile', options)
            // console.log(res)
            const thisProfile = await res.json()
            console.log(thisProfile)
            setProfile(thisProfile)
        } catch (error) {
            console.log(error)
        }
      }
    
  useEffect(() => {getProfile()}, []);
  
  //fetch user comments made on other pages
  const getComments = async () => {

    try{
        const options = { 
            method: 'GET',
            headers: {
              "Authorization": `bearer ${getUserToken()}`
            }
          }
        const res = await fetch(props.backendURL+'/main/user-comments', options)
        // console.log(res)
        const commentsList = await res.json()
        console.log(commentsList)
        setUserComments(commentsList)
    } catch (error) {
        console.log(error)
    }
  }

useEffect(() => {getComments()}, []);

  if(!profile || !userComments){
    return(
      <h2>Loading...</h2>
    )
  }

  return (
    <div>Profile
      <h3>{profile.username}</h3>
      <div>
        <span>email:</span> {profile.email}
      </div>
      <hr></hr>
      <div>
        <h3>Favorites</h3>
      {profile.favorites.map((oneFavorite) => {
            return(
                <Link to={`/${oneFavorite}`}>
                    <li>{oneFavorite.split('-').join(' ')}</li>
                </Link>
            )
        })}
      </div>
      <div>
      <h3>Comments you've posted!</h3>
      {userComments.map((oneComment) => {
            return(
                <Link to={`/${oneComment.brewery}`}>
                    <li>{oneComment.comment} on <span>{oneComment.brewery.split('-').join(' ')}</span></li>
                </Link>
            )
        })}
      </div>
    </div>
  )
}

