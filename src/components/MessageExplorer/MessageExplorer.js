import React from 'react'
import _ from 'lodash'

import './MessageExplorer.scss'

import PathLink from '../PathLink'

import pathName from '../../utils/pathName'
import DeleteButton from '../DeleteButton/DeleteButton'
import AddButton from '../AddButton/AddButton'

export default (props) => {

  const { structure, path } = props

  const collection = path.arr.length ? _.get(structure, path.arr) : structure

  const subPaths = Object.keys(collection)

  return (
    <div className="explorer">
      <h1>{path && path.arr.length ? '/'+path.str : path.str}</h1>
      <ul>
        {
          subPaths.map((subPath) => {
            const result = [...path.arr, subPath]
            return (
              <li key={pathName(result)}>
                <PathLink path={result} />
              </li>
            )
          })
        }
      </ul>
      {
        path.arr.length ? <DeleteButton {...props} /> : null
      }
      <AddButton {...props} />
    </div>
  )

}
