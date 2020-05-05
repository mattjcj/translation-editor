import React from 'react'

import './NavLinks.scss'

import {
  Link
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

  return (
    <div class='nav-links'>
      {prev && <Link to={prev} className='prev'>Prev</Link>}
      {next && <Link to={next} className='next'>Next</Link>}
    </div>
  )
}