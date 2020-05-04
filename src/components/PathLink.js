import React from 'react'
import {
  NavLink
} from "react-router-dom"

import pathString from '../utils/pathString'
import pathName from '../utils/pathName'

class PathLink extends React.Component {
  render() {
    const { path } = this.props
    return (
      <NavLink to={`/messages/${pathString(path)}`} activeClassName="active" exact>{pathName(path)}</NavLink>
    )
  }
}

export default PathLink