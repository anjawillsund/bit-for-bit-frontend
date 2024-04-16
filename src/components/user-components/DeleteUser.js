import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTokenContext } from '../contexts/TokenContext.js'
import { MovieContext } from '../contexts/MovieContext.js'
import Button from '../Button.js'

/**
 * Component for deleting a user account.
 *
 * @returns {JSX.Element} The JSX element representing the DeleteUser component.
 */
const DeleteUser = () => {
	const navigate = useNavigate()

	const fetchWithToken = useTokenContext()

	const { resetState } = useContext(MovieContext)

	const [errorMessage, setErrorMessage] = useState('')

	/**
	 * Handles the deletion of the user account.
	 */
	const handleDeleteAccount = async () => {
		try {
			// const response = await fetchWithToken('http://localhost:5080/user/delete-user', {
			const response = await fetchWithToken('https://cscloud7-230.lnu.se/pixflixr-server/user/delete-user', {
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
		<div id='delete-button'>
			<div>
				{errorMessage ? (
					<p className='system-message'>Could not delete account.</p>
				) : (
					null
				)}
			</div>
			<Button
				onClick={handleDeleteAccount}
				buttonText='Delete this account'
			/>
		</div>
	)
}

export default DeleteUser