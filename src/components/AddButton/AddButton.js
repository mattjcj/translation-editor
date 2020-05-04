import React from 'react'

export default (props) => {

  const { addValue, path } = props

  const [ pathName, setPathName ] = React.useState('')

  const enabled = (pathName.length > 0)

  const handleSubmit = (e, type) => {
    e.preventDefault()
    if (enabled) {
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
      <button onClick={handleAddMessage} disabled={!enabled}>Add Message</button>
      <button onClick={handleAddCollection} disabled={!enabled}>Add Collection</button>
    </form>
  )
}