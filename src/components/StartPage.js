import Button from './Button'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { PuzzleContext } from './contexts/PuzzleContext'
import { useNavigate } from 'react-router-dom'

/**
 * The start page component that allows users to log in or create a new account.
 * @returns {JSX.Element} The JSX element representing the StartPage component.
 */
const StartPage = () => {

  let location = useLocation()
  const [message, setMessage] = useState('')

  const { setIsUserActive } = useContext(PuzzleContext)

  let navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')

  const [state, setState] = useState({
    username: '',
    password: ''
  })

  useEffect(() => {
    // Retrieve the query parameters from the URL
    const urlParams = new URLSearchParams(location.search)
    // Get the value of the 'message' parameter from the query parameters
    const storedMessage = urlParams.get('message')
    // If a 'message' parameter value exists, set it as the message state
    if (storedMessage) {
      setMessage(storedMessage);
      // If no 'message' parameter exists, get the message from location state (if available)
    } else {
      const newMessage = location.state?.message || ''
      setMessage(newMessage)
    }
    // Dependencies include location search and location state message
  }, [location.search, location.state?.message])

  useEffect(() => {
    // Clear the message from the URL when the component is unmounted
    return () => {
      const newUrl = `${window.location.pathname}`
      window.history.replaceState(null, '', newUrl)
    }
  }, [])

  /**
   * Handles the change of input fields.
   *
   * @param {Event} event - The input change event.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }))
  }

  /**
   * Handles the form submission.
   *
   * @param {Event} event - The form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsUserActive(true)
    try {
      const response = await fetch(`${process.env.BASE_URL}/login`, {
        // const response = await fetch('https://cscloud7-230.lnu.se/pixflixr-server/user/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${state.username}&password=${state.password}`
      })
      if (response.ok) {
        const { message, token, groups } = await response.json()
        localStorage.setItem('token', token)
        navigate('/user-profile', { state: { message, groups } })
      } else {
        const errorMessage = await response.text()
        console.log(errorMessage)
        setErrorMessage(errorMessage)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='start-page'>
      <h1 className='logo'>
        <span className='coral'>Bit För Bit</span>
      </h1>
      <div className='form-container'>
        <div className='login-form form'>
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <label>Användarnamn</label>
              <input
                type='text'
                name='username'
                value={state.username}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-control'>
              <label>Lösenord</label>
              <input
                type='password'
                name='password'
                value={state.password}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-control'>
              <button type='submit'>Logga in</button>
            </div>
          </form>
        </div>
        <Link to='/create-user'>
          <Button className='create-account' buttonText='Skapa nytt konto' />
        </Link>
        <div>
          {message ? (
            <p className='system-message'>{message}</p>
          ) : (
            null
          )}
        </div>
        <div>
          {errorMessage ? (
            <p className='system-message'>{errorMessage}</p>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  )
}

export default StartPage