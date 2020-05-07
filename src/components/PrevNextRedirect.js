import React from 'react'
import _ from 'lodash'

import {
  withRouter,
  Redirect
} from 'react-router-dom'

import {
  GlobalHotKeys
} from 'react-hotkeys'

import HashLinkObserver from "react-hash-link"

import findPath from '../utils/findPath'

const keyMap = {
  PREV: ['ArrowLeft'],
  NEXT: ['ArrowRight']
}

class PrevNextRedirect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null
    }
    this.handlers = {
      PREV: this.hotKeyRedirect('prev').bind(this),
      NEXT: this.hotKeyRedirect('next').bind(this)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const state = () => {
      const { redirect } = this.state
      const should = (
        redirect !== nextState.redirect
      )
      return should
    }
    const props = () => {
      const { paths, location } = this.props
      const should = (
        // we actually only need to rerender when we redirected
        ( this.state.redirect && !_.isEqual(location, nextState.location) )
        || !_.isEqual(paths, nextProps.paths)
      )
      return should
    }
    return state() || props()
  }

  hotKeyRedirect(destination) {
    return (e) => {
      // find current path
      const { pathId, paths } = findPath(this.props.paths, this.props.location.pathname)

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
          path = paths[0]
        }
      }

      let location = null

      if(path) {
        location = `/messages/${path.str}#${path.id}`
      }

      this.setState({
        redirect: location
      })
    }
  }

  render() {
    const { redirect } = this.state
    return (
      <>
        { redirect && <Redirect push to={redirect} /> }
        <GlobalHotKeys keyMap={keyMap} handlers={this.handlers} />
        <HashLinkObserver />
      </>
    )
  }
}

export default withRouter(PrevNextRedirect)