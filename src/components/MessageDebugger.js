import React from 'react'

export default (props) => {

  const { messages, path, message } = props

  return (
    <div>
      Messages:<br/>
      <code>
        {JSON.stringify(messages)}
      </code><br/><br/>
      Path:<br/>
      <code>
        {JSON.stringify(path)}
      </code><br/><br/>
      Message:<br/>
      <code>
        {JSON.stringify(message)}
      </code>
    </div>
  )
}