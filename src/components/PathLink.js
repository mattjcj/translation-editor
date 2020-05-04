import React from 'react'
import {
  Link
} from "react-router-dom"

import pathString from '../utils/pathString'
import pathName from '../utils/pathName'

class PathLink extends React.Component {
  render() {
    const { path } = this.props
    return (
      <Link to={`/messages/${pathString(path)}`} >{pathName(path)}</Link>
    )
  }
}

export default PathLink