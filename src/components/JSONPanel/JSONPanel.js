import React from 'react'

import './JSONPanel.scss'

import { JSONEditor } from '../JSONEditor'

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
        <div className='json-panel'>
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
