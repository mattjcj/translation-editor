import React from 'react'
import _ from 'lodash'

import {
  Breadcrumb,
  Segment
} from 'semantic-ui-react'

import {
  NavLink
} from "react-router-dom"

import './MessageExplorer.scss'

import PathLink from '../PathLink'
import pathString from '../../utils/pathString'

import pathName from '../../utils/pathName'
import DeleteButton from '../DeleteButton/DeleteButton'
import AddButton from '../AddButton/AddButton'

export default (props) => {

  const { structure, path } = props

  const collection = path.arr.length ? _.get(structure, path.arr) : structure

  const subPaths = Object.keys(collection)

  let sections = [
    (
      <Breadcrumb.Section active>
        <NavLink to='/messages/'>/</NavLink>
      </Breadcrumb.Section>
    )
  ]

  if(path && path.arr.length) {
    sections = path.arr.map((section, index) => {
      const link = '/messages/' +pathString(
        path.arr.slice(0,index+1)
      )
      const active = index === path.arr.length -1
      return (
        <Breadcrumb.Section active={active}>
          <NavLink to={link}>{section}</NavLink>
        </Breadcrumb.Section>
      )
    })
  }

  return (
    <div className="explorer">
      <Breadcrumb icon='right angle' sections={sections} size='massive' />
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
