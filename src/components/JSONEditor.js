import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'

import Ajv from 'ajv'

import ace from 'brace'
import 'brace/mode/json'
import 'brace/theme/github'

import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'

const ajv = new Ajv({
  allErrors: true,
  verbose: true
})

export class JSONEditor extends React.Component {
  constructor(props) {
    super(props)
    this.editor = null
    this.setRef = this.setRef.bind(this)
    this.runValidation = this.runValidation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setOptions = this.setOptions.bind(this)
  }

  setRef (instance) {
    this.editor = instance
    this.setOptions(this.props.options)
    if(typeof this.props.getRef === 'function'){
      this.props.getRef(instance)
    }
  }
  
  handleChange(json) {

    if(typeof this.props.isValid === 'function') {
      this.runValidation(json)
    }

    if(typeof this.props.onChange === 'function') {
      this.props.onChange(json)
    }

  }

  runValidation(json) {
    let result

    if(this.editor) {
      try {
        this.editor.jsonEditor.get()
        const valid = this.editor.jsonEditor.validateSchema(json)
        result = valid === true
      } catch (e) {
        result = false
      }
    } else {
      result = false
    }
    this.props.isValid(result) 
  }

  setOptions(options) {
    if(this.editor && typeof options !== 'undefined'){
      Object.keys(options).forEach((option) => {
        this.editor.jsonEditor.options[option] = options[option]
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { mode, allowedModes, readOnly, value, options } = this.props
    
    if(readOnly !== prevProps.readOnly) {
      if(readOnly) {
        this.editor.jsonEditor.options.modes = ['view', 'code']
        this.editor.jsonEditor.options.onEditable = () => false
        this.editor.jsonEditor.setMode('view')
      } else {
        this.editor.jsonEditor.options.modes = allowedModes
        this.editor.jsonEditor.options.onEditable = () => true
        this.editor.jsonEditor.setMode(mode || allowedModes[0] || 'tree')
      }
    }

    if(JSON.stringify(value) !== JSON.stringify(prevProps.value)) {
      this.editor.jsonEditor.set(value)
      this.handleChange(value)
    }

    if( !_.isEqual(options, prevProps.options) ) {
      this.setOptions(options)
    }
  }

  componentWillUnmount() {
    this.editor.jsonEditor.destroy()
  }

  render() {
    const {
      value,
      defaultValue,
      onError,
      htmlElementProps,
      // properties to not pass along
      readOnly,
      getRef,
      onChange,
      options,
      isValid,
      // rest
      ...rest
    } = this.props

    return (
      <Editor
        ajv={ajv}
        ace={ace}
        {...rest}
        allowedModes={readOnly ? ['view'] : this.props.allowedModes}
        mode={readOnly ? 'view' : this.props.mode}
        ref={this.setRef}
        value={value || defaultValue}
        onError={onError}
        onChange={this.handleChange}
        htmlElementProps={{
          ...(htmlElementProps && htmlElementProps),
          className: (htmlElementProps && htmlElementProps.className) ? htmlElementProps.className +" hello" : "jsoneditor-parent",
        }}
      />
    )
  }
}

JSONEditor.propTypes = {
  readOnly: PropTypes.bool,
  isValid: PropTypes.func,
  getRef: PropTypes.func,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  options: PropTypes.object,
  mode: PropTypes.string,
  allowedModes: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  defaultValue: PropTypes.object,
  htmlElementProps: PropTypes.object,
}
