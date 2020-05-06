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


class MessageField extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { locale, value, onChange } = this.props
    const should = (
      locale !== nextProps.locale
      || value !== nextProps.value
      || onChange !== nextProps.onChange
    )
    return should
  }

  render() {
    const { locale, value, onChange } = this.props
    return (
      <Segment>
        <Form.Field>
          <label htmlFor={locale}>
            <Flag name={locale.toLowerCase().slice(locale.length - 2, locale.length)} /> {locale.toUpperCase()}
          </label>
          <TextArea
            id={locale}
            name={locale}
            value={value}
            placeholder='Translation'
            onChange={onChange} />
        </Form.Field>
      </Segment>
    )
  }
}


export default class MessageEditor extends React.Component {
  
  shouldComponentUpdate(nextProps) {
    const { messages, structure, path, updateValue } = this.props
    const should = (
      !_.isEqual(this.getMessage(messages, path, structure), this.getMessage(nextProps.messages, nextProps.path, nextProps.structure))
      || updateValue !== nextProps.updateValue
    )
    return should
  }

  getMessage(messages, path, structure) {
    const message = {}

    Object.keys(messages).forEach((locale) => {
      message[locale] = _.get(messages[locale], path.arr) || _.get(structure, path.arr)
    })

    return message
  }

  render() {
    const { messages, structure, path, updateValue } = this.props

    const message = this.getMessage(messages, path, structure)

    const handleChange = (e) => {
      updateValue(path, e.target.name, e.target.value)
    }

    return (
      <Form className="editor">
        <Segment.Group>
            {
              Object.keys(messages).map((locale) => (
                <MessageField key={locale} locale={locale} value={message[locale]} onChange={handleChange} />
              ))
            }
          <Segment>
            <DeleteButton {...this.props} />
          </Segment>
        </Segment.Group>
      </Form>
    )
  }
}
