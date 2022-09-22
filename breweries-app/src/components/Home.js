import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

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

        <div>
            <Link to={`/${randomBrew[0].id}`} >
            <h2>Brewery Spotlight</h2>
            <ul>
                <li>{randomBrew[0].name}</li>
                <li>{randomBrew[0].city}</li>
                <li>{randomBrew[0].country}</li>
            </ul>
            </Link>
        </div>
        <div>
            <Link to={'/about-beer'}>
            <h2>Beers and You</h2>
            <p>Confused about which beer to drink at parties? Don't want to be the odd one out at breweries? Educate yourself about the different styles of beer and what you might like!</p>
            </Link>
        </div>
        <div>
            <Link to={'/editorial'}>
            <h2>Editor's Choice</h2>
            <p>See what our Editor believes is one brewery worth visiting!</p>
            </Link>
        </div>
        <div>
            <h2>Why Beer?</h2>
            <p>It makes you bloated but the sporting events are much more enjoyable! Take the time to search for one near you, and, if fortunes allow, connect with the other kind people on this website.</p>
        </div>
        <div>
          <div>
            <h2>Any of these in your area?</h2>
          </div>
        {randomList.map((oneRandom) => {
            return(
                <Link to={`/${oneRandom.id}`}>
                    <div>{oneRandom.name}</div>
                </Link>
            )
        })}
        </div>
      </div>
    );
}
