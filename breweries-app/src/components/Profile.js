import React, {useState, useEffect} from 'react'
import { getUserToken } from '../storage/authToken'

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
            const res = await fetch(props.backendURL+'/main/profile')
            const thisProfile = await res.json()
            console.log(thisProfile)
            setProfile(thisProfile)
        } catch (error) {
            console.log(error)
        }
      }
    
  useEffect(() => {getProfile()}, []);
  
  return (
    <div>Profile</div>
  )
}

