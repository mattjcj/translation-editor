import React from 'react'

import { Button } from 'semantic-ui-react'

import 'jsonminify'

export default class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (e) => {
    const newFile = e.target.files[0]
    const reader = new FileReader()

    // register event for when the file has finished loading
    reader.onload = (event) => {

      try {
        const fileContent = event.target.result
        let fileObject 
        // Try to parse the JSON file
        try {
          fileObject = JSON.parse(JSON.minify(fileContent))
        } catch (e) {
          throw new Error('Invalid JSON')
        }

        const fileName = newFile && escape(newFile.name)
      
        const fileType = (newFile && newFile.type) || 'n/a'
        const fileLastModifiedDate = (newFile && newFile.lastModifiedDate) ? newFile.lastModifiedDate.toLocaleString() : 'n/a'
      
        const fileMeta = {
          type: fileType,
          size: newFile && newFile.size,
          lastModified: fileLastModifiedDate
        }

        this.props.onChange(fileName, fileMeta, fileObject)

      } catch (e) {
        console.error(e)
      }
  
    }

    try {
      if ( !newFile.type.match('application.json') ) {
        throw new Error('Invalid file type')
      }
      // Read in the file
      reader.readAsText(newFile)
    } catch(e) {
      console.error(e)
    }
  }

  render() {
    const disabled = !(window.File && window.FileReader && window.FileList && window.Blob)

    return (
      <>
        <Button
          content={this.props.label}
          labelPosition="left"
          icon="file"
          onClick={() => this.input.click()}
          disabled={disabled}
        />
        <input
          ref={input => {
            this.input = input
          }}
          type="file"
          hidden
          onChange={this.handleChange}
        />
      </>
    )
  }
}
