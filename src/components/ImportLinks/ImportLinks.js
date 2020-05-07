import React from 'react'

import './ImportLinks.scss'

import {
  Dropdown,
} from 'semantic-ui-react'

import FileInput from '../FileInputDropdown'
import { downloadJSON } from '../../utils/download'

export default class ImportLinks extends React.Component {
  constructor(props) {
    super(props)
    this.handleFileChangeOne = this.handleFileChangeOne.bind(this)
    this.handleFileChangeAll = this.handleFileChangeAll.bind(this)
    this.handleDownloadByLocale = this.handleDownloadByLocale.bind(this)
    this.handleDownloadAll = this.handleDownloadAll.bind(this)
  }

  handleFileChangeOne (fileMeta, fileData) {
    const { upload } = this.props
    const fileNameArr = fileMeta.name.split('.')
    const locale = fileNameArr.slice(0, fileNameArr.length - 1).join('.')
    upload(fileData, locale)
  }

  handleFileChangeAll (fileMeta, fileData) {
    const { upload } = this.props
    upload(fileData)
  }

  handleDownloadAll () {
    const { messages } = this.props
    downloadJSON(JSON.stringify(messages), 'locales')
  }

  handleDownloadByLocale () {
    const { messages } = this.props
    Object.keys(messages).forEach((locale) => {
      downloadJSON(JSON.stringify(messages[locale]), locale)
    })
  }

  render() {
    return (
      <div className='import-links'>
        <Dropdown
          text='Import'
          icon='upload'
          floating
          labeled
          button
          className='icon'
        >
          <Dropdown.Menu>
            <FileInput label='Import a locale' onChange={this.handleFileChangeOne}/>
            <FileInput label='Import all locales' onChange={this.handleFileChangeAll}/>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          text='Download'
          icon='download'
          floating
          labeled
          button
          className='icon'
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.handleDownloadAll}>All</Dropdown.Item>
            <Dropdown.Item onClick={this.handleDownloadByLocale}>By locales</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}
