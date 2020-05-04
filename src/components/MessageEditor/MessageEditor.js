import React from 'react'
import _ from 'lodash'

import './MessageEditor.scss'
import DeleteButton from '../DeleteButton/DeleteButton'

export default (props) => {

  const { messages, structure, path, updateValue, deleteValue } = props

  const message = {}

  Object.keys(messages).forEach((locale) => {
    message[locale] = _.get(messages[locale], path.arr) || _.get(structure, path.arr)
  })

  const handleChange = (e) => {
    updateValue(path, e.target.name, e.target.value)
  }

  return (
    <form className="editor">
      <h1>{path && path.arr.length ? '/'+path.str : path.str}</h1>
      <fieldset>
        <legend>Values</legend>
        {
          Object.keys(messages).map((locale) => (
            <div key={locale}>
              <label htmlFor={locale}>{locale.toUpperCase()}</label>
              <textarea
                id={locale}
                name={locale}
                value={message[locale]}
                onChange={handleChange} />
            </div>
          ))
        }
      </fieldset>
      <DeleteButton {...props} />
    </form>
  )

}
