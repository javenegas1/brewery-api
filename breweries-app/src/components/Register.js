import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

//bootstrap
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Register({handleRegister}) {

  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
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
      navigate('/login', {replace: true})
    //   navigate('/')
    }
  }

  return (
    <div>
  
  <div className='register-page'>
  <img src='https://imgur.com/mMV0e25.jpg'/>
  <Form onSubmit={handleSubmit} className='register-form'>
    <label className='register-title'>Register</label>
    <FloatingLabel controlId="floatingInput" label="Username">
        <Form.Control className='username' type="text" placeholder="Username" name='username' onChange={handleChange} value={newUser.username}/>
      </FloatingLabel>
    <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" name='email' onChange={handleChange} value={newUser.email}/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} value={newUser.password}/>
      </FloatingLabel>
      <hr></hr>
      <Button className='register-btn' variant="danger" type="submit">
        Submit
      </Button>
    </Form>
  </div>

  </div>
  )
}
