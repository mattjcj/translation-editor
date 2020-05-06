import React from 'react'
import _ from 'lodash'

import {
  Flag,
  Form,
  TextArea,
  Breadcrumb,
  Segment
} from 'semantic-ui-react'

import {
  NavLink
} from "react-router-dom"

import './MessageEditor.scss'
import DeleteButton from '../DeleteButton/DeleteButton'
import pathString from '../../utils/pathString'

export default (props) => {

  const { messages, structure, path, updateValue } = props

  const message = {}

  Object.keys(messages).forEach((locale) => {
    message[locale] = _.get(messages[locale], path.arr) || _.get(structure, path.arr)
  })

  const handleChange = (e) => {
    updateValue(path, e.target.name, e.target.value)
  }

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
    <Form className="editor">
      <Breadcrumb icon='right angle' sections={sections} size='massive' />
      <Segment.Group>
          {
            Object.keys(messages).map((locale) => (
              <Segment key={locale}>
                <Form.Field>
                  <label htmlFor={locale}>
                    <Flag name={locale.toLowerCase().slice(locale.length - 2, locale.length)} /> {locale.toUpperCase()}
                  </label>
                  <TextArea
                    id={locale}
                    name={locale}
                    value={message[locale]}
                    placeholder='Translation'
                    onChange={handleChange} />
                </Form.Field>
              </Segment>
            ))
          }
        <Segment>
          <DeleteButton {...props} />
        </Segment>
      </Segment.Group>
    </Form>
  )

}
