import React from 'react'

import './PathLink.scss'

import _ from 'lodash'

import {
  NavLink
} from "react-router-dom"

import {
  Icon
} from 'semantic-ui-react'

class PathLink extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { path, className } = this.props
    const should = (
      !_.isEqual(path, nextProps.path)
      || className !== nextProps.className
    )
    return should
  }

  render() {
    const {
      path,
      className,
    } = this.props
    const icon = path.type === 'collection' ? 'folder' : 'list'
    const classes = className ? `path-link ${className}` : 'path-link'
    return (
      <NavLink to={`/messages/${path.str}`} activeClassName="active" className={classes} id={path.id} exact>
        <Icon name={icon}/>{path.name}
      </NavLink>
    )
  }
}

export default PathLink