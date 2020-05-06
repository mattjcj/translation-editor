import React from 'react'

import {
  Label,
  Flag,
  Icon
} from 'semantic-ui-react'

import './DeleteLocaleButton.scss'

export default (props) => {

  const { deleteLocale, messages } = props

  const handleDelete = (e, targetProps) => {
    e.preventDefault()
    deleteLocale(targetProps.value)
  }

  return (
    <div className='locales-labels'>
      {
        Object.keys(messages).map((availableLocale) => (
          <Label key={availableLocale} size='large'>
            <Flag name={availableLocale.toLowerCase().slice(availableLocale.length - 2, availableLocale.length)} />
            {availableLocale}
            <Icon name='delete' onClick={handleDelete} value={availableLocale} />
          </Label>
        ))
      }
    </div>
  )
}
