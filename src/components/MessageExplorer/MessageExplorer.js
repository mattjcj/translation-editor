import React from 'react'
import _ from 'lodash'

import {
  Segment,
  Menu
} from 'semantic-ui-react'

import './MessageExplorer.scss'

import PathLink from '../PathLink/PathLink'

import DeleteButton from '../DeleteButton/DeleteButton'
import AddButton from '../AddButton/AddButton'
import pathString from '../../utils/pathString'

export default class MessageExplorer extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { paths, currentPath } = this.props
    return (
      !_.isEqual(paths, nextProps.paths)
      || !_.isEqual(currentPath, nextProps.currentPath)
    )
  }

  render() {
    const { paths, currentPath } = this.props
  
    const subPaths = paths.filter((path) => {
      return pathString( path.arr.slice(0, path.arr.length-1) ) === currentPath.str
    })
  
    return (
      <div className="explorer">
        <Menu vertical fluid>
          {
            subPaths.map((subPath) => {
              return (
                <PathLink key={subPath.name} path={subPath} className='item' />
              )
            })
          }
        </Menu>
        <Segment.Group>
          <Segment>
            <DeleteButton {...this.props} disabled={!currentPath.arr.length} />
            <AddButton {...this.props} />
          </Segment>
        </Segment.Group>
      </div>
    )
  }
}
