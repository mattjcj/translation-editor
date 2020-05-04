import React from 'react'

export default (props) => {

  const { addLocale } = props

  const [ locale, setLocale ] = React.useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (locale.length > 0) {
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
      <button onClick={handleAdd}>Add Locale</button>
    </form>
  )
}
