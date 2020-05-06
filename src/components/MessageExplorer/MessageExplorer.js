import React from 'react'
import _ from 'lodash'

import {
  Segment
} from 'semantic-ui-react'

import './MessageExplorer.scss'

import PathLink from '../PathLink/PathLink'

import pathName from '../../utils/pathName'
import DeleteButton from '../DeleteButton/DeleteButton'
import AddButton from '../AddButton/AddButton'
import Location from '../Location/Location'

export default (props) => {

  const { structure, path } = props

  const collection = path.arr.length ? _.get(structure, path.arr) : structure

  const subPaths = Object.keys(collection)

  return (
    <div className="explorer">
      <Location {...props} />
      <Segment.Group>
        <Segment>
          <ul>
            {
              subPaths.map((subPath) => {
                const result = [...path.arr, subPath]
                return (
                  <li key={pathName(result)}>
                    <PathLink {...props} path={result} />
                  </li>
                )
              })
            }
          </ul>
        </Segment>
        <Segment>
          <DeleteButton {...props} disabled={!path.arr.length} />
          <AddButton {...props} />
        </Segment>
      </Segment.Group>
    </div>
  )

}
