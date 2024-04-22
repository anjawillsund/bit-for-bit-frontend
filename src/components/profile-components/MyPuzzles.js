import Button from '../Button'
import React from 'react'
import { useContext, useEffect } from 'react'
import { PuzzleContext } from '../contexts/PuzzleContext'
import { useNavigate, Link } from 'react-router-dom'
import { TokenContext } from '../contexts/TokenContext'
import nullPuzzleImage from '../../assets/images/null-puzzle.jpeg'

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
    try {
      const response = await fetchWithToken(`${process.env.REACT_APP_API_URL}/logout`, {
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

  const handleAddPuzzle = () => {
    navigate('/add-puzzle')
  }

  return (
    <div className='puzzles'>
      <Button
        onClick={handleLogout}
        buttonText='Logout'
      />
      <Button
        onClick={handleAddPuzzle}
        buttonText='Lägg till pussel'
      />
      {isLoadingPuzzles ? (
        <p>Laddar...</p>
      ) : (
        <ul>
          {puzzlesArray.length > 0 ? (puzzlesArray.map(puzzle => (
            <li key={puzzle.id} className="puzzle-item">
              <Link to={`/puzzles/${puzzle.id}`}>
              {puzzle.imageUrl ? (
              <img src={puzzle.imageUrl} alt={puzzle.title} />
              ) : (
                <img src={nullPuzzleImage} alt={''} />
              )}
              <div className="text-content">
                <h3>{puzzle.title}</h3>
                <p>Antal bitar: {puzzle.piecesNumber ? (puzzle.piecesNumber) : ('-')}</p>
              </div>
              </Link>
            </li>
          ))
          ) : (
            <p>Inga pussel att visa</p>
          )}
        </ul>
      )}
    </div>
  )
}

export default MyPuzzles