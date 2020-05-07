import React from 'react'

import {
  Label,
  Flag,
  Icon,
  Popup,
  Button
} from 'semantic-ui-react'

import './DeleteLocaleButton.scss'

export default (props) => {

  const { deleteLocale, messages } = props

  const handleDelete = (e, targetProps) => {
    e.preventDefault()
    deleteLocale(targetProps.value)
  }

  return (


    <Popup
      className='locales-labels'
      wide
      trigger={<Button negative>Delete locales</Button>}
      on='click'
      hoverable
      hideOnScroll
      position='bottom right'
      popperModifiers={{ preventOverflow: { boundariesElement: "window" } }}
    >
      <div>
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
    </Popup>
  )
}
