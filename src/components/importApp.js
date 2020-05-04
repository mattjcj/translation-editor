import React from 'react'
import _ from 'lodash'

import './App.css'

import { JSONEditor } from './JSONEditor'

const style = {
  root: {
    display: 'flex',
    width: '100%'
  },
  editor: {
    flex: '1 1 0px'
  }
}

const initial = {
  en: {
    "auth": {
      "close": "Error while closing the connection",
      "inexistantUser": "User does not exist",
      "invalidToken": "Invalid token",
      "ldapConnection": "Error connecting to authentication server",
      "login": "Incorrect login/password",
      "noToken": "No token provided",
      "noUser": "No user provided",
      "noUserClose": "No user provided / Close error",
      "unauthorized": "Unauthorized access",
      "userDeactivated": "User deactivated",
      "validate": "Validation errors"
    },
  },
  fr: {}
}

const listPaths = (paths, obj, currentPath) => {
  const currentSub = _.get(obj, currentPath)
  if (typeof currentSub === 'string') {
    paths.push(
      JSON.stringify(currentPath.slice(1))
    )
  } else if (typeof currentSub === 'object') {
    const subPaths = Object.keys(currentSub)
    subPaths.forEach((subPath) => {
      listPaths(paths, obj, [...currentPath, subPath])
    })
  }
}

class App extends React.component {
  constructor(props) {
    super(props)
    this.state = {
      val: initial,
      controlledVal: initial,
      paths: this.generatePaths(initial)
    }
  }
  
  generatePaths (messages) {
    const locales = Object.keys(messages)
    const pathsByLocale = {}
    locales.forEach((locale) => {
      const pathList = []
      listPaths(pathList, messages, [locale])
      pathsByLocale[locale] = pathList
    })
    return pathsByLocale
  }

  handleJSONChange = locale => json => {
    console.log(locale)
    // keep track of value
    this.setState()
    setVal((prevVal) => {
      const newVal = _.cloneDeep(prevVal)
      const paths = listPaths
      // check for each locale if the key exists

      newVal[locale] = _.cloneDeep(json)
      return newVal
    })
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState.controlledVal !== this.state.controlledVal) {
      this.setState({
        val: this.state.controlledVal
      })
    }
  }

  render() {
    const { controlledVal } = this.state.controlledVal
    return (
      <div style={style.root}>
        {
          Object.keys(controlledVal).map((locale) => (
            <div style={style.editor} key={locale}>
              <JSONEditor
                value={controlledVal[locale]}
                onChange={this.handleJSONChange(locale)}
                //isValid={handleJSONValid}
                history={true}
                allowedModes={['tree', 'code', 'view']}
                // schema={schema}
                // options={options}
              />
            </div>
          ))
        }
      </div>
    )
  }
}

export default App
