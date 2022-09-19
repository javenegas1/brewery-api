import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

export default function Home(props) {
    const [randomBrew, setRandomBrew] = useState(null)

    const getRandomBrew = async () => {
      try{
          const res = await fetch(props.URL+'/random')
          const random = await res.json()
          console.log(random)
          setRandomBrew(random)
      } catch (error){
          console.log(error)
      }
    }
  
    useEffect(() => {getRandomBrew()}, []);
  
    if (!randomBrew) {
      return <p>Loading ...</p>
    }
  
    return (
      <div>
        <div>
            <Link to={`/${randomBrew[0].id}`} >
            <h2>random brewery</h2>
            <ul>
                <li>{randomBrew[0].name}</li>
                <li>{randomBrew[0].city}</li>
                <li>{randomBrew[0].country}</li>
            </ul>
            </Link>
        </div>
        <div>
            <h2>Article about beer preferences, different styles</h2>
        </div>
        <div>
            <h2>Editor's Choice</h2>
        </div>
        <div>
            <h2>Why Beer?</h2>
            <p>It makes you bloated but the sporting events are much more enjoyable</p>
        </div>
      </div>
    );
}
