import React from 'react'

import {
  useParams
} from "react-router-dom"

import MessageEditor from './MessageEditor/MessageEditor'
import MessageExplorer from './MessageExplorer/MessageExplorer'
import NavLinks from './NavLinks/NavLinks'
import Location from './Location/Location'

export default (props) => {
  let { messagePath } = useParams()
  const { paths } = props

  let pathId

  const path = paths.find((item, index) => {
    const found = item.str === messagePath
    if(found) {
      pathId = index
    }
    return found
  })

  let content
  if (path && path.type === 'message') {
    content = <MessageEditor {...props} path={path} pathId={pathId} />
  } else if (path) {
    content = <MessageExplorer {...props} path={path} pathId={pathId} />
  } else {
    content = <MessageExplorer {...props} path={paths[0]} pathId={0} />
  }

  return (
    <div className='column'>
      <NavLinks {...props} pathId={pathId}/>
      <div className='panel-wrapper'>
        <Location path={path} />
        {content}
      </div>
    </div>
  )
}
