import React from 'react'
import _ from 'lodash'

import './Sidebar.scss'

import PathLink from '../PathLink'
import GlobalMenu from '../GlobalMenu/GlobalMenu'

import iterate from '../../utils/iterate'
import pathName from '../../utils/pathName'

const Iterator = (props) => {

  const { structure, messages } = props

  const parse = (base) => {
    const onString = (path, value) => {
      let isValid = true
      Object.keys(messages).forEach((locale) => {
        const value = _.get(messages[locale], path)
        if(!value.length) {
          isValid = false
        }
      })
      const key = pathName(path)
      return (
        <li key={key} className={`item item-message ${isValid ? '' : 'invalid'}`}>
          <PathLink path={path} />
        </li>
      )
    }

    const onObject = (path, value, deeper) => {
      const content = deeper ? deeper() : null
      if (path.length) {
        const key = pathName(path)
        return (
          <li key={key} className='item item-collection'>
            <PathLink path={path} />
            <ul>
              {content}
            </ul>
          </li>
        )
      } else { // root element
        return (
          <li className='item item-collection'>
            <PathLink path={[]} />
            <ul>
              {content}
            </ul>
          </li>
        )
      }
    }

    return iterate(base, onString, onObject)
  }

  return (
    <ul>
      {parse(structure)}
    </ul>
  )
}

class Sidebar extends React.Component {
  render() {
    return (
      <aside className="sidebar">
        <GlobalMenu {...this.props} />
        <Iterator {...this.props} />
      </aside>
    )
  }
}

export default Sidebar