import React from 'react'

export default (props) => {

  const { deleteValue, path, disabled } = props

  const handleDelete = (e) => {
    deleteValue(path)
  }

  return (
    <button onClick={handleDelete} disabled={disabled}>Delete</button>
  )
}