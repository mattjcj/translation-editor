import React from 'react'
import _ from 'lodash'

import {
  Segment,
  Menu
} from 'semantic-ui-react'

import './MessageExplorer.scss'

import PathLink from '../PathLink/PathLink'

import pathName from '../../utils/pathName'
import DeleteButton from '../DeleteButton/DeleteButton'
import AddButton from '../AddButton/AddButton'

export default (props) => {

  const { structure, path } = props

  const collection = path.arr.length ? _.get(structure, path.arr) : structure

  const subPaths = Object.keys(collection)

  return (
    <div className="explorer">
      <Menu vertical fluid>
        {
          subPaths.map((subPath) => {
            const result = [...path.arr, subPath]
            return (
              <PathLink {...props} key={pathName(result)} path={result} className='item' />
            )
          })
        }
      </Menu>
      <Segment.Group>
        <Segment>
          <DeleteButton {...props} disabled={!path.arr.length} />
          <AddButton {...props} />
        </Segment>
      </Segment.Group>
    </div>
  )

}
