import React from 'react'
import { Link } from "react-router-dom";

//bootstrap
import { LinkContainer } from 'react-router-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';

export default function Search(props) {
    // console.log(props.searchBrews)
    let searchedBrews = props.searchBrews

  if(searchedBrews.length>1){
    return (
        <div>
            <div>
                <h2 className='search-count'>{searchedBrews.length} results...</h2>
            </div>

    <ListGroup as="ol" numbered className='search-list'>
    {searchedBrews.map((oneBrew) => {
            return(
              <LinkContainer to={`/${oneBrew.id}`}>
                <ListGroup.Item action variant="warning" as="li">{oneBrew.name} - in {oneBrew.city}, {oneBrew.state}</ListGroup.Item>  
              </LinkContainer>
            )
        })}
    </ListGroup>
        </div>
      )
  } else {
    return (
        <div>
            <div>
                <h2 className='search-count'>{searchedBrews.length} result...</h2>
            </div>
        <ListGroup as="ol" numbered className='search-list'>
            {searchedBrews.map((oneBrew) => {
            return(
              <LinkContainer to={`/${oneBrew.id}`}>
                <ListGroup.Item action variant="warning" as="li">{oneBrew.name} - in {oneBrew.city}, {oneBrew.state}</ListGroup.Item>  
              </LinkContainer>
            )
        })}
        </ListGroup>
        </div>
      )
  }
}
