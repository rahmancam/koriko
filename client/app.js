import React from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home'

/**
 * App component
 * @returns {Object}
 */
function App () {
  return (
    <Home />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
