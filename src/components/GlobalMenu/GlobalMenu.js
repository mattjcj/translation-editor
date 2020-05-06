import React from 'react'

import './GlobalMenu.scss'

import AddLocaleButton from '../AddLocaleButton/AddLocaleButton'
import DeleteLocaleButton from '../DeleteLocale/DeleteLocaleButton'

class GlobalMenu extends React.PureComponent {
  render() {
    return (
      <div className='global-menu'>
        <AddLocaleButton {...this.props} />
        <DeleteLocaleButton {...this.props} />
      </div>
    )
  }
}

export default GlobalMenu