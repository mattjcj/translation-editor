import React from 'react'
import { JSONEditor } from './JSONEditor'

const Editor = (props) => {
  const [val, setVal] = React.useState({})
  const [controlledVal, setControlledVal] = React.useState({})

  const { onChange } = props

  const handleJSONChange = json => {
    // keep track of value
    setVal(json)
    onChange(json)
  }

  const handleJSONValid = valid => {
    // do something if it's valid (boolean)
  }

  React.useEffect(() => {
    setVal(controlledVal)
  }, [controlledVal])

  return (
    <JSONEditor
    value={controlledVal}
    onChange={handleJSONChange}
    isValid={handleJSONValid}
    history={true}
    allowedModes={['tree', 'code', 'view']}
    // schema={schema}
    // options={options}
  />
  )

}

export default Editor
