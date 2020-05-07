import React from 'react'

import './JSONPanel.scss'

import { JSONEditor } from '../JSONEditor'
import ImportLinks from '../ImportLinks/ImportLinks'

import 'jsonminify'

class JSONPanel extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleJSONChange = this.handleJSONChange.bind(this)
  }

  handleJSONChange(json) {
    const { onChange } = this.props
    onChange(json)
  }

  render() {
    const { messages } = this.props
    
    return (
      <div className='column'>
        <ImportLinks {...this.props} />
        <div className='panel-wrapper json-panel'>
          <JSONEditor
            value={messages}
            onChange={this.handleJSONChange}
            history={true}
            mode='form'
            allowedModes={['form', 'code', 'view']}
            //isValid={handleJSONValid}
            // schema={schema}
            // options={options}
          />
        </div>
      </div>
    )
  }
}

export default JSONPanel
