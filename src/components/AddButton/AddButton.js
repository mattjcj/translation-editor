import React from 'react'

import {
  Input,
  Select,
  Button
} from 'semantic-ui-react'

export default (props) => {

  const { addValue, path } = props

  const [ pathName, setPathName ] = React.useState('')
  const [ type, setType ] = React.useState('message')

  const enabled = (pathName.length > 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (enabled) {
      addValue(path, pathName, type)
      setPathName('')
    }
  }

  const handleChangeType = (e, { value }) => {
    setType(value)
  }

  const handleChange = (e, { value }) => {
    setPathName( value )
  }

  const options = [
    {key: 'message', text: 'Message', value: 'message'},
    {key: 'collection', text: 'Collection', value: 'collection'}
  ]

  return (
    <form >
      <Input type='text' placeholder='Add...' value={pathName} onChange={handleChange} action>
        <input />
        <Select compact options={options} defaultValue={type} onChange={handleChangeType} />
        <Button onClick={handleSubmit} disabled={!enabled} icon='add'/>
      </Input>
    </form>
  )
}