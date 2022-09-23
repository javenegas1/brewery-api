import React from 'react'
import {Link} from 'react-router-dom'

//bootstrap
import { LinkContainer } from 'react-router-bootstrap'

export default function Editorial() {
  return (
    <div>
      <LinkContainer to={'/good-word-brewing-and-public-house-duluth'}>
        <h2 className='editorial-title'>Good Word Brewing & Public House</h2>
      </LinkContainer>
      <div className='editorial'>
      <p>
        I'll keep this to the point. Good selections, Good food, and good area to spend a few hours at if you have the time. A brewery with the feel of a modern Cracker Barrel and the choices of just about any type of beer you can find. Good Word Brewing is doing a lot of things right. Not to mention it is located in a picturesque old-style town with a lot of other options for dining if the menu there isn't appetizing. Give this place a try if you're in town!
      </p>
      <img src='https://imgur.com/2LLWFvp.jpg'/>
      </div>
    </div>
  )
}
