import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Register({handleRegister}) {

  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const navigate = useNavigate()

  function handleChange(e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const authResponse = await handleRegister(newUser)
      console.log(authResponse)
      navigate('/', {replace: true})
    }catch(err){
      console.log(err)
    //   navigate('/login', {replace: true})
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
        value={newUser.username}
      />
    </label>
    <label>
      <span>Email</span>
      <input
        type="text"
        required
        name="email"
        placeholder="a@a"
        onChange={handleChange}
        value={newUser.email}
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
        value={newUser.password}
      />
    </label>
    <input type="submit"/>
  </form>
  )
}
