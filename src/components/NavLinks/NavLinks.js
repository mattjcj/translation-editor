import React from 'react'

import './NavLinks.scss'

import {
  Link,
  NavLink
} from "react-router-dom"

export default (props) => {

  const { pathId, paths } = props

  let prev = null
  let next = null

  if (pathId > 0) {
    prev = '/messages/' +paths[pathId-1].str
  }

  if (pathId < paths.length - 1) {
    next = '/messages/' +paths[pathId+1].str
  }

  if(typeof pathId === 'undefined') {
    next = '/messages/' +paths[1].str
  }

  return (
    <p className='nav-links'>
      {prev ? <Link to={prev} className='prev ui button'>Prev</Link> : <span class='button ui disabled'>Prev</span>}
      <NavLink to='/json' activeClassName="active" exact>View JSON</NavLink>
      {next ? <Link to={next} className='next ui button'>Next</Link> : <span class='button ui disabled'>Next</span>}
    </p>
  )
}