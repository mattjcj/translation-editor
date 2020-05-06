import React from 'react'

import {
  NavLink
} from "react-router-dom"

import {
  Icon
} from 'semantic-ui-react'

import pathString from '../utils/pathString'

class PathLink extends React.Component {
  render() {
    const { path, paths } = this.props
    const pathData = paths.find((pathEval) => pathEval.str === pathString(path))
    return (
      <NavLink to={`/messages/${pathData.str}`} activeClassName="active" exact>{pathData.name}</NavLink>
    )
  }
}

export default PathLink