import Button from '../Button'
import { useContext, useEffect, useState } from 'react'
import { PuzzleContext } from '../contexts/PuzzleContext'
import { useNavigate, Link } from 'react-router-dom'
import nullPuzzleImage from '../../assets/images/null-puzzle.jpeg'

import filter from '../../assets/icons/filter.png'

/**
 * Renders a list of the user's puzzles.
 * @param {Object} props - The component props.
 * 
 * @returns {JSX.Element} The JSX element representing the ShowGroups component.
 */
const MyPuzzles = () => {
  const navigate = useNavigate()

  const { fetchUserPuzzles, puzzlesArray, isLoadingPuzzles, setIsLoadingPuzzles } = useContext(PuzzleContext)

  const [hideLentOut, setHideLentOut] = useState(false)
  const [selectedPieces, setSelectedPieces] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function loadData() {
      await fetchUserPuzzles()
      setIsLoadingPuzzles(false)
    }
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddPuzzle = () => {
    navigate('/add-puzzle')
  }

  const toggleLentOutFilter = () => {
    setHideLentOut(!hideLentOut)
  }

  const togglePieceFilter = (pieceNumber) => {
    if (selectedPieces.includes(pieceNumber)) {
      setSelectedPieces(selectedPieces.filter((piece) => piece !== pieceNumber))
    } else {
      setSelectedPieces([...selectedPieces, pieceNumber])
    }
  }

  const uniquePieceNumbers = [...new Set(puzzlesArray.map((puzzle) => puzzle.piecesNumber))].filter(Boolean)

  const handleToggleFilter = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className='puzzles'>
      <div className='add-puzzle-button-container'>
        <Button
          id='filter-button'
          onClick={handleToggleFilter}
          imageSrc={filter}
        />
        <Button
          onClick={handleAddPuzzle}
          buttonText='+'
        />
        {showFilters && (
        <div className='piece-filter'>
        <Button onClick={toggleLentOutFilter} buttonText={hideLentOut ? 'Show Lent Out' : 'Hide Lent Out'} />
        {uniquePieceNumbers.map((pieceNumber) => (
          <label key={pieceNumber}>
            <input
              type='checkbox'
              checked={selectedPieces.includes(pieceNumber)}
              onChange={() => togglePieceFilter(pieceNumber)}
            />
            {pieceNumber}
          </label>
        ))}
      </div>
        )}
      </div>
      {isLoadingPuzzles ? (
        <p>Laddar...</p>
      ) : (
        <ul>
          {puzzlesArray.length > 0 ? (puzzlesArray.map((puzzle) => (hideLentOut && puzzle.isLentOut) || (selectedPieces.length > 0 && !selectedPieces.includes(puzzle.piecesNumber)) ? null : (
            <li key={puzzle.id} className="puzzle-item">
              <Link to={`/puzzles/${puzzle.id}`}>
                <div className={`image-container ${puzzle.isLentOut ? 'lent-out' : ''}`}>
                  {puzzle.imageUrl ? (
                    <img
                      src={puzzle.imageUrl}
                      alt={puzzle.title}
                    />
                  ) : (
                    <img
                      src={nullPuzzleImage}
                      alt={''}
                    />
                  )}
                </div>
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