import React, {useState, useEffect} from 'react'
import { getUserToken } from '../storage/authToken'
import { Link } from "react-router-dom";

export default function Profile(props) {
    const [profile, setProfile] = useState(null)

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
  
  if(!profile){
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
    </div>
  )
}

