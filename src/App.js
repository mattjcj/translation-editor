import React from 'react'
import _ from 'lodash'

import {
  Redirect,
} from 'react-router-dom'

import './scss/App.scss'

import withRouter from './components/withRouter'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main'

import generateStructure from './utils/generateStructure'
import generatePaths from './utils/generatePaths'

const initialMessages = {
  en: {
    foo: {
      bar: 'baz',
      bur: 'buz'
    },
    bol: {
      bul: 'bum',
      bal: {
        bel: 'bem',
        zz: {
          uuuuu: 'joooj'
        }
      }
    }
  },
  fr: {
    yolo: 'yulu'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: initialMessages,
      redirect: null
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleAddLocale = this.handleAddLocale.bind(this)
  }

  handleUpdate(path, locale, value) {
    this.setState((prevState) => {
      const newState = {}
      newState.messages = _.cloneDeep(prevState.messages)
      _.set(newState.messages[locale], path.arr, value)
      return newState
    })
  }

  handleAdd(path, pathName, type) {
    this.setState((prevState) => {
      const newState = {}
      const newPath = [...path.arr]
      newPath.push(pathName)
      const value = type === 'collection' ? {} : ''

      //const newLocation = ['/messages', ...newPath]
      //newState.redirect = newLocation.join('/')

      newState.messages = _.cloneDeep(prevState.messages)
      Object.keys(newState.messages).forEach((locale) => {
        _.set(newState.messages[locale], newPath, value)
      })
      return newState
    })
  }

  handleDelete(path) {
    this.setState((prevState) => {
      const newState = {}
      
      const newLocation = path.arr.slice(0, path.arr.length - 1)
      newLocation.unshift('/messages')
      newState.redirect = newLocation.join('/')

      newState.messages = _.cloneDeep(prevState.messages)
      Object.keys(newState.messages).forEach((locale) => {
        _.unset(newState.messages[locale], path.arr)
      })
      return newState
    })
  }

  handleAddLocale(locale) {
    this.setState((prevState) => {
      const newState = {}
      newState.messages = _.cloneDeep(prevState.messages)
      const structure = generateStructure(newState.messages)
      newState.messages[locale] = _.cloneDeep(structure)
      return newState
    })
  }

  render() {
    const { messages, redirect } = this.state
    const structure = generateStructure(messages)
    // we need to generate paths from structure and not messages to avoid
    // duplicates because of multiple locales
    const paths = generatePaths(structure)

    if(redirect) {
      this.setState({
        redirect: null
      })
      return <Redirect push to={redirect} />
    }
    return (
      <div className="container">
        <Sidebar structure={structure} addLocale={this.handleAddLocale} />
        <Main
          structure={structure}
          paths={paths}
          messages={messages}
          updateValue={this.handleUpdate}
          deleteValue={this.handleDelete}
          addValue={this.handleAdd} />
      </div>
    )
  }
}

export default withRouter(App)