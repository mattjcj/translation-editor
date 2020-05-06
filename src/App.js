import React from 'react'
import _ from 'lodash'

import {
  Redirect,
  withRouter
} from 'react-router-dom'

import HashLinkObserver from "react-hash-link"

import {
  GlobalHotKeys
} from 'react-hotkeys'

import './scss/App.scss'

// import withRouter from './components/withRouter'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main'

import generateStructure from './utils/generateStructure'
import generatePaths from './utils/generatePaths'
import clone from './utils/fastClone'

import en from './data/en-us'
import fr from './data/fr'
import de from './data/de'

const initialMessages = { 'en-us': en, 'fr-ch': fr, 'de-ch': de }

const keyMap = {
  PREV: ['ArrowLeft'],
  NEXT: ['ArrowRight']
}

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.structureMessages(initialMessages),
      redirect: null
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleJSONUpdate = this.handleJSONUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleAddLocale = this.handleAddLocale.bind(this)
    this.handleDeleteLocale = this.handleDeleteLocale.bind(this)
    this.handlers = {
      PREV: this.hotKeyRedirect('prev').bind(this),
      NEXT: this.hotKeyRedirect('next').bind(this)
    }
  }

  hotKeyRedirect(destination) {
    return (e) => {
      // find current path
      const { pathId, paths } = this.findPath()

      let path
      if (destination === 'prev'){
        // if we're not on the first element, go to the prev one, otherwise loop to last (either undefined or first)
        if ( pathId > 0) {
          path = paths[pathId-1]
        } else {
          path = paths[paths.length - 1]
        }
      }
    
      if (destination === 'next') {
        // if we're not on the last element, go to the next one, otherwise loop to first (either undefined or last)
        if (pathId < paths.length - 1) {
          path = paths[pathId+1]
        } else {
          path = paths[1]
        }
      }

      console.log(pathId)


      let location = null

      if(path) {
        location = `/messages/${path.str}#${path.id}`
      }

      this.setState({
        redirect: location
      })
    }
  }

  findPath(paths) {
    if(typeof paths === 'undefined') {
      const structure = generateStructure(this.state.messages)
      paths = generatePaths(this.state.messages, structure)
    }
    const currentLocation = this.props.location.pathname
    let path
    let pathId
    // find current path
    paths.forEach((pathEval, index) => {
      if (`/messages/${pathEval.str}` === currentLocation) {
        pathId = index
        path = pathEval
      }
    })
    return {
      pathId,
      path,
      paths
    }
  }

  structureMessages(messages) {
    const structuredMessages = {}
    Object.keys(messages).forEach((locale) => {
      const structure = generateStructure(messages)
      const clonedMessages = clone(messages[locale])
      structuredMessages[locale] = _.merge(structure, clonedMessages)
    })
    return structuredMessages
  }

  handleUpdate(path, locale, value) {
    this.setState((prevState) => {
      const newState = {}
      newState.messages = clone(prevState.messages)
      _.set(newState.messages[locale], path.arr, value)
      return newState
    })
  }

  handleJSONUpdate(json) {
    this.setState(() => {
      const newMessages = clone(json)
      const newState = {
        messages: this.structureMessages(newMessages)
      }
      return newState
    })
  }

  handleAdd(path, pathName, type) {
    this.setState((prevState) => {
      const newState = {}
      const newPath = [...path.arr]
      newPath.push(pathName)
      const value = type === 'collection' ? {} : ''

      const newLocation = ['/messages', ...newPath]
      newState.redirect = newLocation.join('/')

      newState.messages = clone(prevState.messages)
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

      newState.messages = clone(prevState.messages)
      Object.keys(newState.messages).forEach((locale) => {
        _.unset(newState.messages[locale], path.arr)
      })
      return newState
    })
  }

  handleAddLocale(locale) {
    this.setState((prevState) => {
      const newState = {}
      newState.messages = clone(prevState.messages)
      const structure = generateStructure(newState.messages)
      newState.messages[locale] = clone(structure)
      return newState
    })
  }

  handleDeleteLocale(locale) {
    this.setState((prevState) => {
      const newState = {}
      newState.messages = clone(prevState.messages)
      delete newState.messages[locale]
      return newState
    })
  }

  componentDidUpdate() {
    if(this.state.redirect) {
      this.setState({
        redirect: null
      })
    }
  }

  render() {
    const { messages, redirect } = this.state
    const structure = generateStructure(messages)
    // we need to generate paths from structure and not messages to avoid
    // duplicates because of multiple locales
    const paths = generatePaths(messages, structure)
    const { path } = this.findPath(paths)

    return (
      <div className="container">
        { redirect && <Redirect push to={redirect} /> }
        <Sidebar
          structure={structure}
          paths={paths}
          currentPath={path}
          messages={messages}
          addLocale={this.handleAddLocale}
          deleteLocale={this.handleDeleteLocale} />
        <Main
          structure={structure}
          paths={paths}
          currentPath={path}
          messages={messages}
          updateValue={this.handleUpdate}
          JSONUpdateValue={this.handleJSONUpdate}
          deleteValue={this.handleDelete}
          addValue={this.handleAdd} />
        <HashLinkObserver />
        <GlobalHotKeys keyMap={keyMap} handlers={this.handlers} />
      </div>
    )
  }
}

export default withRouter(App)