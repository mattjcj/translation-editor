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
    const { path, className, withAnchor } = this.props
    const should = (
      !_.isEqual(path, nextProps.path)
      || className !== nextProps.className
      || withAnchor !== nextProps.withAnchor
    )
    return should
  }

  render() {
    const {
      path,
      className,
      withAnchor
    } = this.props
    const icon = path.type === 'collection' ? 'folder' : 'list'
    const classes = className ? `path-link ${className}` : 'path-link'
    const destination = withAnchor ? `/messages/${path.str}#${path.id}` : `/messages/${path.str}`
    return (
      <NavLink to={destination} activeClassName="active" className={classes} id={path.id} exact>
        <Icon name={icon}/>{path.name}
      </NavLink>
    )
  }
}

export default PathLink