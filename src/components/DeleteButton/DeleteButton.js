import React from 'react'

export default (props) => {

  const { deleteValue, path } = props

  const handleDelete = (e) => {
    deleteValue(path)
  }

  return (
    <button onClick={handleDelete}>Delete</button>
  )
}