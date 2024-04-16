/**
 * Entry point of the React application.
 * Renders the <App /> component into the root element.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

/**
 * The root element of the application.
 * It is used to render the <App /> component.
 *
 * @type {ReactRoot}
 */
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  /**
   * The main component of the application wrapped in <React.StrictMode>.
   * It enables additional checks and warnings for the development environment.
   */
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
