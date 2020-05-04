import React from 'react'

import {
  useParams,
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
    <>
      {prev && <Link to={prev}>Prev</Link>}
      {next && <Link to={next}>Next</Link>}
    </>
  )
}