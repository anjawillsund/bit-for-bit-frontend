import { useContext, useState } from 'react'
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
	const [errorMessage, setErrorMessage] = useState('')

	/**
	 * Handles the logout action.
	 */
	const handleLogout = async () => {
		try {
			const response = await fetchWithToken(`${process.env.REACT_APP_API_URL}/logout`, {
				method: 'GET'
			})
			resetState()
			localStorage.removeItem('token')
			navigate('/')
			if (!response.ok) {
				const errorMessage = await response.text()
				setErrorMessage(errorMessage)
				console.log(errorMessage)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='logout-button'>
			<Button
				onClick={handleLogout}
				imageSrc={logOut}
			/>
			<div>
				{errorMessage ? (
					<p className='system-message'>Kunde inte logga ut.</p>
				) : (
					null
				)}
			</div>
		</div>
	)
}

export default LogOut