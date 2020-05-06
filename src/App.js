import React from 'react'
import _ from 'lodash'

import {
  Redirect,
  withRouter
} from 'react-router-dom'

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
import PrevNextRedirect from './components/PrevNextRedirect'

const initialMessages = { 'en-us': en, 'fr-ch': fr, 'de-ch': de }

const withRedirect = (WrappedComponent) => (props) => {

  const [location, setLocation] = React.useState(null)

  const redirect = (loc) => {
    setLocation(loc)
  }

  React.useEffect(() => {
    if(location) {
      setLocation(null)
    }
  }, [location])

  return (
    <>
      {location && <Redirect to={location} push />}
      <WrappedComponent {...props} redirect={redirect} />
    </>
  )
  
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
      messages: this.structureMessages(initialMessages),
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleJSONUpdate = this.handleJSONUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleAddLocale = this.handleAddLocale.bind(this)
    this.handleDeleteLocale = this.handleDeleteLocale.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const state = () => {
      const { messages } = this.state
      const should = (
        !_.isEqual(messages, nextState.messages)
      )
      return should
    }/*
    const props = () => {
       const { location } = this.props
      const should = (
        // we actually only need to rerender when we redirected
        // this.state.redirect && !_.isEqual(location, nextState.location)
      )
      return should
    }*/
    return state() //|| props()
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
      //newState.redirect = newLocation.join('/')
      this.props.redirect(newLocation.join('/'))

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

    return (
      <div className="container">
        { redirect && <Redirect push to={redirect} /> }
        <Sidebar
          structure={structure}
          paths={paths}
          messages={messages}
          addLocale={this.handleAddLocale}
          deleteLocale={this.handleDeleteLocale} />
        <Main
          structure={structure}
          paths={paths}
          messages={messages}
          updateValue={this.handleUpdate}
          JSONUpdateValue={this.handleJSONUpdate}
          deleteValue={this.handleDelete}
          addValue={this.handleAdd} />
        <PrevNextRedirect paths={ paths } />
      </div>
    )
  }
}

export default withRouter(withRedirect(App))
