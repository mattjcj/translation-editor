import React from 'react'

import './Sidebar.scss'

import PathLink from '../PathLink'

import iterate from '../../utils/iterate'
import pathName from '../../utils/pathName'
import AddLocaleButton from '../AddLocaleButton/AddLocaleButton'

const Iterator = (props) => {

  const { structure } = props

  const parse = (base) => {
    const onString = (path, value) => {
      const key = pathName(path)
      return (
        <li key={key} className='item item-message'>
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
    //const { paths } = this.props
    return (
      <aside className="sidebar">
        <Iterator {...this.props} />
        <AddLocaleButton {...this.props} />
      </aside>
    )
  }
}

export default Sidebar