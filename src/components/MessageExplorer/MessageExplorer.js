import React from 'react'
import _ from 'lodash'

import {
  Segment,
  Menu
} from 'semantic-ui-react'

import { withRouter } from 'react-router-dom'

import './MessageExplorer.scss'

import PathLink from '../PathLink/PathLink'

import DeleteButton from '../DeleteButton/DeleteButton'
import AddButton from '../AddButton/AddButton'
import pathString from '../../utils/pathString'
import findPath from '../../utils/findPath'

class MessageExplorer extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { paths, location } = this.props
    return (
      !_.isEqual(paths, nextProps.paths)
      || !_.isEqual(location, nextProps.location)
    )
  }

  render() {
    const { paths, location } = this.props

    const { path } = findPath(paths, location.pathname)
  
    const subPaths = paths.filter((subPath) => {
      return path && pathString( subPath.arr.slice(0, subPath.arr.length-1) ) === path.str && subPath.arr.length > 0
    })
  
    return (
      <div className="explorer">
        <Menu vertical fluid>
          {
            subPaths.map((subPath) => {
              return (
                <PathLink key={subPath.name} path={subPath} className='item' withAnchor />
              )
            })
          }
        </Menu>
        <Segment.Group>
          <Segment className='actions'>
            <AddButton {...this.props} />
            <DeleteButton {...this.props} disabled={path && !path.arr.length} />
          </Segment>
        </Segment.Group>
      </div>
    )
  }
}

export default withRouter(MessageExplorer)
