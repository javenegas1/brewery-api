import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
//bootstrap
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      <div>
    <div className='register-page'>
  <img src='https://imgur.com/mMV0e25.jpg'/>
  <Form onSubmit={handleSubmit} className='register-form'>
    <label className='register-title'>Login</label>
    <FloatingLabel controlId="floatingInput" label="Username">
        <Form.Control className='username' type="text" placeholder="Username" name='username' onChange={handleChange} value={returningUser.username}/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} value={returningUser.password}/>
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
