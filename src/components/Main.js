import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom"

import PathParser from './PathParser'
import JSONPanel from './JSONPanel/JSONPanel'

const Main = (props) => {
  //let match = useRouteMatch()
  return (
    <Switch>
      <Route path="/messages/:messagePath*">
        <PathParser {...props} />
      </Route>
      <Route path="/json">
        <JSONPanel {...props} onChange={props.JSONUpdateValue} />
      </Route>
    </Switch>
  )
}

export default Main