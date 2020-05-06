import React from 'react'

import './AddLocaleButton.scss'

import {
  Input
} from 'semantic-ui-react'

export default (props) => {

  const { addLocale, messages } = props

  const [ locale, setLocale ] = React.useState('')

  const locales = Object.keys(messages)
  const enabled = locale.length > 0 && locales.indexOf(locale.toLowerCase()) < 0

  const handleAdd = (e) => {
    console.log(e)
    e.preventDefault()
    if (enabled) {
      addLocale(locale.toLowerCase())
      setLocale('')
    }
  }

  const handleChange = (e) => {
    setLocale(e.target.value)
  }

  return (
    <form className='add-locale-form'>
      <Input
        action={{
          icon: 'add',
          disabled: !enabled,
          onClick: handleAdd
        }}
        placeholder='Locale'
        value={locale}
        onChange={handleChange}
        fluid />
    </form>
  )
}
