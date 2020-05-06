import React from 'react'

import './PathLink.scss'

import {
  NavLink
} from "react-router-dom"

import {
  Icon
} from 'semantic-ui-react'

import pathString from '../../utils/pathString'

class PathLink extends React.Component {
  render() {
    const { path, paths } = this.props
    const pathData = paths.find((pathEval) => pathEval.str === pathString(path))
    const icon = pathData.type === 'collection' ? 'folder' : 'list'
    return (
      <NavLink to={`/messages/${pathData.str}`} activeClassName="active" className="path-link" exact>
        <Icon name={icon}/>{pathData.name}
      </NavLink>
    )
  }
}

export default PathLink