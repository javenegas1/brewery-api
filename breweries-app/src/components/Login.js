import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login({handleLogin}) {

    const [returningUser, setReturningUser] = useState({ username: "", password: "" });
    const navigate = useNavigate()
  
    function handleChange(e) {
      setReturningUser({ ...returningUser, [e.target.name]: e.target.value });
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const authResponse = await handleLogin(returningUser)
        // console.log(authResponse)
        navigate('/', {replace: true})
      }catch(err){
        console.log(err)
        navigate('/')
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
      <label>
        <span>Username</span>
        <input
          type="text"
          required
          name="username"
          placeholder="Enter your username"
          onChange={handleChange}
          value={returningUser.username}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          required
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={returningUser.password}
        />
      </label>
      <input type="submit"/>
    </form>
    )
}
