import React from 'react'
import _ from 'lodash'

import {
  Flag,
  Form,
  TextArea,
  Segment
} from 'semantic-ui-react'

import './MessageEditor.scss'
import DeleteButton from '../DeleteButton/DeleteButton'

export default (props) => {

  const { messages, structure, path, updateValue } = props

  const message = {}

  Object.keys(messages).forEach((locale) => {
    message[locale] = _.get(messages[locale], path.arr) || _.get(structure, path.arr)
  })

  const handleChange = (e) => {
    updateValue(path, e.target.name, e.target.value)
  }

  return (
    <Form className="editor">
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
