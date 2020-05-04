import React from 'react'

export default (props) => {

  const { addValue, path } = props

  const [ pathName, setPathName ] = React.useState('')

  const handleSubmit = (e, type) => {
    e.preventDefault()
    if (pathName.length > 0) {
      addValue(path, pathName, type)
      setPathName('')
    }
  }

  const handleAddCollection = (e) => {
    handleSubmit(e, 'collection')
  }

  const handleAddMessage = (e) => {
    handleSubmit(e, 'message')
  }

  const handleChange = (e) => {
    setPathName(e.target.value)
  }

  return (
    <form >
      <input type="text" value={pathName} onChange={handleChange} />
      <button onClick={handleAddMessage}>Add Message</button>
      <button onClick={handleAddCollection}>Add Collection</button>
    </form>
  )
}