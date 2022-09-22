import React from 'react'
import { Link } from "react-router-dom";

export default function Search(props) {
    // console.log(props.searchBrews)
    let searchedBrews = props.searchBrews
  return (
    <div>
        <div>
            <h2>{searchedBrews.length+1} results...</h2>
        </div>
        {searchedBrews.map((oneBrew) => {
            return(
                <Link to={`/${oneBrew.id}`}>
                    <div>{oneBrew.name}</div>
                </Link>
            )
        })}
    </div>
  )
}
