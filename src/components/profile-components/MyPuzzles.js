import Button from '../Button'
import { useContext, useEffect } from 'react'
import { PuzzleContext } from '../contexts/PuzzleContext'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../contexts/TokenContext'

/**
 * Renders a list of the user's puzzles.
 * @param {Object} props - The component props.
 * 
 * @returns {JSX.Element} The JSX element representing the ShowGroups component.
 */
const MyPuzzles = () => {
  const navigate = useNavigate()
  const fetchWithToken = useContext(TokenContext)

  const { fetchUserPuzzles, puzzlesArray, resetState, isLoadingPuzzles, setIsLoadingPuzzles } = useContext(PuzzleContext)

  useEffect(() => {
    async function loadData() {
		await fetchUserPuzzles()
    setIsLoadingPuzzles(false)
	  }
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = async () => {
    resetState()
    try {
      const response = await fetchWithToken('http://localhost:8090/logout', {
        method: 'GET'
      })
      if (response.ok) {
        resetState()
        localStorage.removeItem('token')
        const message = 'You have been logged out'
        navigate('/', { state: { message } })
      } else {
        console.log('Could not log out')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='self-matches matches'>
      <Button
				onClick={handleLogout}
				buttonText='Logout'
			/>
			{isLoadingPuzzles ? (
				<p>Loading...</p>
			) : (
				<ul>
					{puzzlesArray.length > 0 ? (puzzlesArray.map(puzzle => (
						<li key={puzzle._id}>
							{Object.entries(puzzle).map(([key, value], index) => (
                key === 'imageUrl' && (
									<img key={`${puzzle.puzzleId}`} src={value} alt={puzzle.title} />
								)
							))}
						</li>
					))
					) : (
						<p>No puzzles to display</p>
					)}
				</ul>
			)}
		</div>
	)
}

export default MyPuzzles