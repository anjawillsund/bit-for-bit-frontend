import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTokenContext } from '../contexts/TokenContext.js'
import { MovieContext } from '../contexts/MovieContext.js'
import Button from '../Button.js'

/**
 * Component for logging out a user.
 *
 * @returns {JSX.Element} The JSX element representing the LogOut component.
 */
const LogOut = () => {
	const navigate = useNavigate()

	const fetchWithToken = useTokenContext()

	const { resetState } = useContext(MovieContext)

	const [errorMessage, setErrorMessage] = useState('')

	/**
	 * Handles the logout action.
	 */
	const handleLogout = async () => {
		try {
			// const response = await fetchWithToken('http://localhost:5080/user/logout', {
			const response = await fetchWithToken('https://cscloud7-230.lnu.se/pixflixr-server/user/logout', {
				method: 'GET'
			})
			if (response.ok) {
				resetState()
				localStorage.removeItem('token')
				const message = await response.text()
				navigate('/', { state: { message } })
			} else {
				const errorMessage = await response.text()
				setErrorMessage(errorMessage)
				console.log(errorMessage)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<Button
				onClick={handleLogout}
				buttonText='Logout'
			/>
			<div>
				{errorMessage ? (
					<p className='system-message'>Could not log out.</p>
				) : (
					null
				)}
			</div>
		</div>
	)
}

export default LogOut