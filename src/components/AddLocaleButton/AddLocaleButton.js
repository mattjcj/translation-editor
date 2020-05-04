import React from 'react'

export default (props) => {

  const { addLocale } = props

  const [ locale, setLocale ] = React.useState('')

  const enabled = locale.length > 0

  const handleAdd = (e) => {
    e.preventDefault()
    if (enabled) {
      console.log(addLocale)
      addLocale(locale)
      setLocale('')
    }
  }

  const handleChange = (e) => {
    setLocale(e.target.value)
  }

  return (
    <form >
      <input type="text" value={locale} onChange={handleChange} />
      <button onClick={handleAdd} disabled={!enabled}>Add Locale</button>
    </form>
  )
}
