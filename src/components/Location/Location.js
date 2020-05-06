import React from 'react'

import {
  Breadcrumb
} from 'semantic-ui-react'

import {
  NavLink
} from "react-router-dom"

import './Location.scss'

import pathString from '../../utils/pathString'

export default (props) => {

  const { path } = props

  let sections = [
    (
      <Breadcrumb.Section active key='/messages/'>
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
        <Breadcrumb.Section active={active} key={link}>
          <NavLink to={link}>{section}</NavLink>
        </Breadcrumb.Section>
      )
    })
  }

  return (
    <Breadcrumb icon='right angle' sections={sections} size='massive' className='location'/>
  )

}
