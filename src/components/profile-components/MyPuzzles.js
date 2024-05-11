import Button from '../Button'
import { useContext, useEffect, useState } from 'react'
import { PuzzleContext } from '../contexts/PuzzleContext'
import { useNavigate, Link } from 'react-router-dom'
import nullPuzzleImage from '../../assets/images/null-puzzle.jpeg'
import filter from '../../assets/icons/filter.png'
import lentImage from '../../assets/icons/lent-out-red.png'
import notLentImage from '../../assets/icons/lent-out-yellow.png'
import allImage from '../../assets/icons/lent-out-green.png'

/**
 * Renders a list of the user's puzzles.
 * @param {Object} props - The component props.
 * 
 * @returns {JSX.Element} The JSX element representing the ShowGroups component.
 */
const MyPuzzles = () => {
  const navigate = useNavigate()

  const { fetchUserPuzzles, puzzlesArray, isLoadingPuzzles, setIsLoadingPuzzles } = useContext(PuzzleContext)

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

  const [lentOutFilter, setLentOutFilter] = useState('all')

  const handleAddPuzzle = () => {
    navigate('/add-puzzle')
  }

  const toggleLentOutFilter = () => {
    switch (lentOutFilter) {
      case 'all':
        setLentOutFilter('lent')
        break
      case 'lent':
        setLentOutFilter('notLent')
        break
      case 'notLent':
        setLentOutFilter('all')
        break
      default:
        setLentOutFilter('all')
    }
  }

  const togglePieceFilter = (pieceNumber) => {
    if (selectedPieces.includes(pieceNumber)) {
      setSelectedPieces(selectedPieces.filter((piece) => piece !== pieceNumber))
    } else {
      setSelectedPieces([...selectedPieces, pieceNumber])
    }
  }

  const uniquePieceNumbers = [...new Set(puzzlesArray.map((puzzle) => puzzle.piecesNumber))].filter(Boolean).sort((a, b) => a - b)

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
          <div className='filter-field'>
            <div id='lent-out-button-field'>
              <Button
                id='lent-out-button'
                onClick={toggleLentOutFilter}
                imageSrc={lentOutFilter === 'all' ? allImage : lentOutFilter === 'lent' ? lentImage : notLentImage}
              />
            </div>
            <div id='pieces-number-filter'>
              <p>Antal bitar</p>
              <div id='pieces-number-options'>
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
            </div>
          </div>
        )}
      </div>
      {isLoadingPuzzles ? (
        <div className='loading'>
          <p>Laddar...</p>
        </div>
      ) : (
        <ul>
          {puzzlesArray.length > 0 ? (puzzlesArray.map((puzzle) => (lentOutFilter === 'notLent' && puzzle.isLentOut) || (lentOutFilter === 'lent' && !puzzle.isLentOut) || (selectedPieces.length > 0 && !selectedPieces.includes(puzzle.piecesNumber)) ? null : (
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
                  <h3>
                    <span className='blue'>&#183;&#183;&#183; </span>
                    {puzzle.title}
                    <span className='blue'> &#183;&#183;&#183;</span>
                  </h3>
                  <p>
                    <span className='green'>{puzzle.piecesNumber ? (puzzle.piecesNumber) : ('-')}</span>
                    <span className='blue'> &#183; </span>
                    <span className='yellow'>{puzzle.manufacturer ? (puzzle.manufacturer) : ('-')}</span>
                  </p>
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