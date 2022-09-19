import React, { useState, useEffect } from 'react'


export default function Random(props) {

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
      display random brewery
      <ul>
        <li>{randomBrew[0].name}</li>
        <li>{randomBrew[0].city}</li>
        <li>{randomBrew[0].country}</li>
        <li>{randomBrew[0].website_url}</li>
        <li>{randomBrew[0].phone}</li>
      </ul>
    </div>
  );
}
