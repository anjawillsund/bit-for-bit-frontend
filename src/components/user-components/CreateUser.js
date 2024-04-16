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
      const response = await fetch('http://localhost:8090/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({
          username: state.username,
          password: state.password
        }) 
      })
      console.log(response)

      if (response.ok) {
        console.log('User created')
        const message = await response.text()
        navigate('/', { state: { message } })
      } else {
        const errorText = await response.text()
        const errorMessage = JSON.parse(errorText).message
        let error
        if (errorMessage === 'The password must contain at least 10 characters.' || errorMessage === 'The password must not contain more than 2000 characters.' || errorMessage === 'User validation failed: password: Path `password` is required.') {
          error = 'Lösenordet måste innehålla mellan 10 och 2 000 tecken.'
        } else if (errorMessage === 'User validation failed: username: Path `username` is required.' || errorMessage === 'The username must not contain more than 50 characters.') {
          error = 'Lösenordet måste innehålla mellan 1 och 50 tecken.'
        } else if (errorMessage === 'User validation failed: username: Path `username` is required., password: Path `password` is required.') {
          error = 'Användarnamnet måste innehålla minst ett tecken och lösenordet måste innehålla minst tio tecken.'
        } else if (errorMessage === 'The username is not available.') {
          error = 'Användarnamnet är upptaget.'
        }
        if (error) {
          console.log(error)
          setErrorMessage(error)
        } else {
          console.log(errorMessage)
          setErrorMessage('Ett okänt fel uppstod. Försök igen.')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='create-user-form'>
      <h1 className='logo'>
        <span className='coral'>Bit För Bit</span>
      </h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h2>Skapa ett konto</h2>
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
            <button type='submit'>Skapa</button>
          </div>
        </form>
        <Link to='/'><Button className='go-to-login-button' buttonText='Tillbaka till startsidan' /></Link>
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
