import React from 'react'

import {
  Button
} from 'semantic-ui-react'

import './DeleteButton.scss'

export default (props) => {

  const { deleteValue, path, disabled } = props

  const handleDelete = (e) => {
    deleteValue(path)
  }

  return (
    <Button onClick={handleDelete} disabled={disabled} negative>Delete</Button>
  )
}