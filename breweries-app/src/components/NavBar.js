import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

//bootstrap crap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'

export default function NavBar(props) {
  //search function
  //takes input field and appends it to API url
  //no results found if input does not match one of the
  //else 'no results found'

  const [searchBrews, setSearchBrews] = useState('');
  let navigate = useNavigate()

  const handleChange = (event) => {
    setSearchBrews(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        if(searchBrews !==''){
            let resCity = await fetch(props.URL+`?by_city=${searchBrews}&per_page=50`)
            let resState = await fetch(props.URL+`?by_state=${searchBrews}&per_page=50`)
            let resZipCode = await fetch(props.URL+`?by_postal=${searchBrews}&per_page=50`)

            const breweriesCity = await resCity.json()
            const breweriesState = await resState.json()
            const breweriesZipCode = await resZipCode.json()

            let finalSearch = breweriesCity.concat(breweriesState, breweriesZipCode)

            //in case of no results
            if(finalSearch.length > 0){
                props.setSearchBrews(finalSearch)
                navigate('/search')
            } else {
                navigate('/no_results')
            }
          }
    } catch (error) {
        console.log(error)
    }
  };
  if(props.authState){
    return (
        <div>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>BarHops</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/profile'>
                <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to='/login'>
                <Nav.Link onClick={props.handleLogout}>Logout</Nav.Link>
            </LinkContainer>

          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="State, City, Zip Code"
              name="search"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button variant="outline-warning" hidden>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
      )
  } else {
    return (
        <div>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>BarHops</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/register'>
                <Nav.Link>Register</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>

          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="State, City, Zip Code"
              name="search"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button variant="outline-warning" hidden >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
      )
  }
}
