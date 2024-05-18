import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../contexts/TokenContext.js'
import { PuzzleContext } from '../contexts/PuzzleContext.js'
import Button from '../Button.js'
import logOut from '../../assets/icons/logout.png'

/**
 * Component for logging out a user.
 *
 * @returns {JSX.Element} The JSX element representing the LogOut component.
 */
const LogOut = () => {
	const navigate = useNavigate()
	const fetchWithToken = useContext(TokenContext)
	const { resetState } = useContext(PuzzleContext)

	/**
	 * Handles the logout action.
	 */
	const handleLogout = async () => {
		try {
			const response = await fetchWithToken(`${process.env.REACT_APP_API_URL}/logout`, {
				method: 'GET'
			})
			// Reset the state and remove the token from the local storage.
			resetState()
			localStorage.removeItem('token')
			// Redirect the user to the start page.
			navigate('/')
			if (!response.ok) {
				const errorMessage = await response.text()
				throw new Error(errorMessage)
			}
		} catch (error) {
			console.error('Error logging out:', error)
		}
	}

	return (
		<div className='logout-button'>
			<Button
				onClick={handleLogout}
				imageSrc={logOut}
			/>
		</div>
	)
}

export default LogOut