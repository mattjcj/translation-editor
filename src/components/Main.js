import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom"
import EditorPanel from './EditorPanel'

const Main = (props) => {
  //let match = useRouteMatch()
  return (
    <Switch>
      <Route path="/messages">
        <EditorPanel {...props} />
      </Route>
    </Switch>
  )
}

export default Main