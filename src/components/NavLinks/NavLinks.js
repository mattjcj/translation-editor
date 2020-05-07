import React from 'react'

import './NavLinks.scss'

import {
  Link,
  NavLink,
} from "react-router-dom"

export default (props) => {

  const { pathId, paths } = props

  let prev = null
  let next = null

  if (pathId > 0) {
    const newPath = paths[pathId-1]
    prev = `/messages/${newPath.str}#${newPath.id}`
  }

  if (pathId < paths.length - 1) {
    const newPath = paths[pathId+1]
    next = `/messages/${newPath.str}#${newPath.id}`
  }

  if(typeof pathId === 'undefined') {
    const newPath = paths[1]
    next = newPath ? `/messages/${newPath.str}#${newPath.id}` : null
  }

  return (
    <p className='nav-links'>
      {prev ? <Link to={prev} className='prev ui button'>Prev</Link> : <span className='button ui disabled'>Prev</span>}
      <NavLink to='/json' activeClassName="active" exact>View JSON</NavLink>
      {next ? <Link to={next} className='next ui button'>Next</Link> : <span className='button ui disabled'>Next</span>}
    </p>
  )
}