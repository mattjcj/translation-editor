import React from 'react'
import _ from 'lodash'

import {
  Switch,
  Route
} from "react-router-dom"

import PathParser from './PathParser'
import JSONPanel from './JSONPanel/JSONPanel'

class Main extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { JSONUpdateValue, addValue, deleteValue, messages, paths, structure, updateValue } = this.props
    const should = (
      JSONUpdateValue !== nextProps.JSONUpdateValue
      || addValue !== nextProps.addValue
      || deleteValue !== nextProps.deleteValue
      || updateValue !== nextProps.updateValue
      || !_.isEqual(messages, nextProps.messages)
      || !_.isEqual(paths, nextProps.paths)
      || !_.isEqual(structure, nextProps.structure)
    )
    return should
  }

  render(){
    //let match = useRouteMatch()
    return (
      <Switch>
        <Route path="/messages/:messagePath*">
          <PathParser {...this.props} />
        </Route>
        <Route path="/json">
          <JSONPanel {...this.props} onChange={this.props.JSONUpdateValue} />
        </Route>
      </Switch>
    )
  }
}

export default Main