import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button.js'
import { Link } from 'react-router-dom'

// Code partially from https://www.freecodecamp.org/news/how-to-create-forms-in-react-using-react-hook-form/

/**
 * Component for creating a user.
 *
 * @returns {JSX.Element} The JSX element representing the CreateUser component.
 */
const CreateUser = () => {

  let navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')

  const [state, setState] = useState({
    username: '',
    password: ''
  })

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
    try {
      // const response = await fetch('http://localhost:5080/user/create', {
      const response = await fetch('https://cscloud7-230.lnu.se/pixflixr-server/user/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${state.username}&password=${state.password}`
      })
      if (response.ok) {
        console.log('User created')
        const message = await response.text()
        navigate('/', { state: { message } })
      } else {
        const errorText = await response.text()
        if (errorText === 'User validation failed: password: Path `password` is required.') {
          const error = 'The password must contain at least 10 characters.'
          console.log(error)
          setErrorMessage(error)
        } else if (errorText === 'User validation failed: username: Path `username` is required.') {
          const error = 'The username must contain at least one character.'
          console.log(error)
          setErrorMessage(error)
        } else if (errorText === 'User validation failed: username: Path `username` is required., password: Path `password` is required.') {
          const error = 'The username must contain at least one character and the password must contain at least ten characters.'
          console.log(error)
          setErrorMessage(error)
        } else {
          console.log(errorText)
          setErrorMessage(errorText)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='create-user-form'>
      <h1 className='logo'>
        <span className='coral'>Pix</span>
        <span className='blue'>Flixr</span>
      </h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h2>Create an account to start pixing flix!</h2>
          <div className='form-control'>
            <label>Username</label>
            <input
              type='text'
              name='username'
              value={state.username}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-control'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={state.password}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-control'>
            <button type='submit'>Create</button>
          </div>
        </form>
        <Link to='/'><Button className='go-to-login-button' buttonText='Back to login' /></Link>
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

export default CreateUser
