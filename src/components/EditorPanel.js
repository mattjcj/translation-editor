import React from 'react'

import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"

import PathParser from './PathParser'

const Editor = (props) => {
  let match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/:messagePath*`}>
        <PathParser {...props} />
      </Route>
    </Switch>
  )
}

export default Editor

