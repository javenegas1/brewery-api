import React, {useState, useEffect} from 'react'
import { getUserToken, clearUserToken } from '../storage/authToken'
import { Link, useNavigate } from "react-router-dom";

//bootstrap
import { LinkContainer } from 'react-router-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';

export default function Profile(props) {
    const [profile, setProfile] = useState(null)
    const [userComments, setUserComments] = useState([])
    const navigate = useNavigate()

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

  //------------------------------------------------------>
  //delete user profile
  const deleteProfile = async () => {
    try{
      const options = {
        method: "DELETE",
        headers: { Authorization: `bearer ${getUserToken()}` },
      };
      const res = await fetch(props.backendURL+`/main/profile/delete`, options)
      const deletedProfile = await res.json()
      console.log(deletedProfile)
      props.handleLogout()
      navigate('/')
    } catch(error){
      console.log(error)
    }
  }
  //------------------------------------------------------>
  
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
    <div>
      <h3 className='profile-header'>{profile.username}'s Profile</h3>
      <div>
        <span>email:</span> {profile.email}
      </div>
      <div>
      <button onClick={deleteProfile}>Don't Go!</button>
      </div>
      <hr></hr>
      <div>
        <h3>Favorites</h3>

      <ListGroup as="ol" numbered className='favorites-list'>
            {profile.favorites.map((oneFavorite) => {
            return(
              <LinkContainer to={`/${oneFavorite}`}>
                <ListGroup.Item action variant="secondary" as="li">{oneFavorite.split('-').join(' ')}</ListGroup.Item>  
              </LinkContainer>
            )
        })}
        </ListGroup>
        </div>

      <div className='user-comments'>
      <h3>Comments you've posted!</h3>

      <ListGroup as="ol" className='comment-list'>
      {userComments.map((oneComment) => {
            return(
            <LinkContainer to={`/${oneComment.brewery}`}>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{oneComment.comment}</div>
                <span>posted on {oneComment.brewery.split('-').join(' ')}</span>
              </div>
            </ListGroup.Item>
            </LinkContainer>
            )
        }).reverse()}
    </ListGroup>
    </div>
    </div>
  )
}

