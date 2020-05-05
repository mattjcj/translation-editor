import React from 'react'

import {
  NavLink
} from "react-router-dom"

import './GlobalMenu.scss'

import AddLocaleButton from '../AddLocaleButton/AddLocaleButton'
import DeleteLocaleButton from '../DeleteLocale/DeleteLocaleButton'

class GlobalMenu extends React.Component {
  render() {
    return (
      <div className='global-menu'>
        <NavLink to='/json' activeClassName="active" exact>View JSON</NavLink>
        <AddLocaleButton {...this.props} />
        <DeleteLocaleButton {...this.props} />
      </div>
    )
  }
}

export default GlobalMenu