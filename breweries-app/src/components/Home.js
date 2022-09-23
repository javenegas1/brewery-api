import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

//BootStrap Crap
import { LinkContainer } from 'react-router-bootstrap'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Home(props) {
    const [randomBrew, setRandomBrew] = useState(null)
    const [randomList, setRandomList] = useState([])

    //top 5 cities list?

    //returns one random brewery from fetch req
    const getRandomBrew = async () => {
      try{
          const res = await fetch(props.URL+'/random')
          const random = await res.json()
          setRandomBrew(random)
      } catch (error){
          console.log(error)
      }
    }
  
    useEffect(() => {getRandomBrew()}, []);
  
    //returns 10 random breweries from fetch req
    const getRandomList = async () => {
      try{
          const res = await fetch(props.URL+'/random?size=10')
          const randoms = await res.json()
          setRandomList(randoms)
      } catch (error){
          console.log(error)
      }
    }
  
    useEffect(() => {getRandomList()}, []);

    if (!randomBrew || !randomList) {
      return <p>Loading ...</p>
    }
  
    return (
      <div>
  <CardGroup className='card-group'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://imgur.com/txOjZZ2.jpg" />
      <LinkContainer to={`/${randomBrew[0].id}`}>
      <Card.Body>
        <Card.Title>Brewery Spotlight</Card.Title>
        <Card.Text>
          Today's spotlight is on {randomBrew[0].name}! Check them out if you happen to be in {randomBrew[0].city}, {randomBrew[0].state}!
        </Card.Text>
      </Card.Body>
      </LinkContainer>
    </Card>

    <Card style={{ width: '18rem' }}>

      <Card.Img variant="top" src="https://imgur.com/sY5DChX.jpg"/>
      <LinkContainer to={`/about-beer`}>
      <Card.Body>
        <Card.Title>Beers and You</Card.Title>
        <Card.Text>
        Confused about which beer to drink at parties? Don't want to be the odd one out at breweries? Educate yourself about the different styles of beer and what you might like!
        </Card.Text>
      </Card.Body>
      </LinkContainer>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://imgur.com/CQJZCQ3.jpg" />
      <LinkContainer to={`/editorial`}>
      <Card.Body>
        <Card.Title>The Opinion</Card.Title>
        <Card.Text>
          See what our Editor believes is one brewery worth visiting! If you happend to be in town, definitely check this one out!
        </Card.Text>
      </Card.Body>
      </LinkContainer>
    </Card>
  </CardGroup>

  <hr></hr>
  <div>
    <h2 className='random-list-title'>Any of these in your area?</h2>
  </div>

    <ListGroup as="ol" numbered className='random-list'>
    {randomList.map((oneRandom) => {
            return(
              <LinkContainer to={`/${oneRandom.id}`}>
                <ListGroup.Item action variant="secondary" as="li">{oneRandom.name} - in {oneRandom.city}, {oneRandom.state}</ListGroup.Item>  
              </LinkContainer>
            )
        })}
    </ListGroup>

    <div>
        <h2 className='generic-title'>Why Beer?</h2>
        <p className='why-beer'>It makes you bloated but the sporting events are much more enjoyable! Take the time to search for one near you, and, if fortunes allow, connect with the other kind people on this website.</p>
    </div>

      </div>
    );
}
