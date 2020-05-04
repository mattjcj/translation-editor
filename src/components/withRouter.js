import React from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'

function withRouter(WrappedComponent) {
  return class extends React.Component {
    render() {
      // Enrobe le composant initial dans un conteneur, sans le modifier. Mieux !
      return (
        <Router>
          <WrappedComponent {...this.props} />
        </Router>
      )
    }
  }
}

export default withRouter
