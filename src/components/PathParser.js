import React from 'react'

import {
  useParams
} from "react-router-dom"

import MessageEditor from './MessageEditor/MessageEditor'
import MessageExplorer from './MessageExplorer/MessageExplorer'

const defaultPath = {
  type: 'collection',
  str: '/',
  arr: []
}

export default (props) => {
  let { messagePath } = useParams()
  const { paths } = props

  const path = paths.find((item) => item.str === messagePath)

  if (path && path.type === 'message') {
    return <MessageEditor {...props} path={path} />
  } else if (path) {
    return <MessageExplorer {...props} path={path} />
  } else {
    return <MessageExplorer {...props} path={defaultPath} />
  }
}
