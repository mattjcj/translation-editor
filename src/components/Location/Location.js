import React from 'react'
import _ from 'lodash'

import {
  Breadcrumb
} from 'semantic-ui-react'

import {
  NavLink
} from "react-router-dom"

import './Location.scss'

import pathString from '../../utils/pathString'
import pathId from '../../utils/pathId'

class LocationSection extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { active, link, text } = this.props
    const should = (
      active !== nextProps.active
      || link !== nextProps.link
      || text !== nextProps.text
    )
    return should
  }

  render() {
    const { active, link, text } = this.props
    return (
      <Breadcrumb.Section active={active}>
          <NavLink to={link}>{text}</NavLink>
      </Breadcrumb.Section>
    )
  }
}

class LocationSections extends React.Component {
  shouldComponentUpdate(nextProps) {
    const should = (
      !_.isEqual(this.props.path, nextProps.path)
    )
    return should
  }

  render() {
    const { path } = this.props
    
    if(path && path.arr.length) {

      return (
        <>
          {
            path.arr.map((section, index) => {
              const str = pathString(path.arr.slice(0,index+1))
              const id = pathId(path.arr.slice(0,index+1))
              const link = `/messages/${str}#${id}`
              const active = index === path.arr.length -1
              console.log(link)
              return (
                <React.Fragment key={link}>
                  <LocationSection link={link} active={active} text={section}/>
                  {
                    (index !== path.arr.length - 1) && (<Breadcrumb.Divider icon='right angle' key={`${link}-divider`}/>)
                  }
                </React.Fragment>
              )
            })
          }
        </>
      )

    } else {
      return [
        <LocationSection key='/messages/' link='/messages/' active text='/'/>
      ]
    }
  }
}

export default class Location extends React.Component {
  shouldComponentUpdate(nextProps) {
    const should = (
      !_.isEqual(this.props.path, nextProps.path)
    )
    return should
  }

  render () {
    const { path } = this.props

    return (
      <Breadcrumb size='massive' className='location' >
        <LocationSections path={path} />
      </Breadcrumb>
    )
  }
}
