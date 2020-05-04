import React from 'react'

import './DeleteLocaleButton.scss'

export default (props) => {

  const { deleteLocale, messages } = props

  const [ locale, setLocale ] = React.useState('')

  const handleDelete = (e) => {
    e.preventDefault()
    if (locale.length > 0) {
      deleteLocale(locale)
      setLocale('')
    }
  }

  const handleChange = (e) => {
    setLocale(e.target.value)
  }

  return (
    <form >
      <select value={locale} onChange={handleChange} >
        <option value=""></option>
          {
            Object.keys(messages).map((availableLocale) => (
              <option key={availableLocale} value={availableLocale}>{availableLocale.toUpperCase()}</option>
            ))
          }
      </select>
      <button onClick={handleDelete}>Delete Locale</button>
    </form>
  )
}
