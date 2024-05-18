import Button from '../Button'
import { useContext, useEffect, useState } from 'react'
import { PuzzleContext } from '../contexts/PuzzleContext'
import { useNavigate, Link } from 'react-router-dom'
import nullPuzzleImage from '../../assets/images/null-puzzle.jpeg'
import filter from '../../assets/icons/filter-white.png'
import { useTokenContext } from '../contexts/TokenContext'

/**
 * Renders a list of the user's puzzles.
 * @param {Object} props - The component props.
 * 
 * @returns {JSX.Element} The JSX element representing the ShowGroups component.
 */
const MyPuzzles = () => {
  const fetchWithToken = useTokenContext()
  const navigate = useNavigate()
  const { isLoadingPuzzles, puzzlesArray, setPuzzlesArray, setIsLoadingPuzzles } = useContext(PuzzleContext)
  const [selectedPieces, setSelectedPieces] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOption, setSelectedOption] = useState('all')

  /**
   * Function that fetches the user's puzzles from the server.
   */
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchWithToken(`${process.env.REACT_APP_API_URL}/my/puzzles`, {
          method: 'GET'
        })
        if (response.ok) {
          const puzzles = await response.json()
          setPuzzlesArray(puzzles)
          setIsLoadingPuzzles(false)
        } else if (response.status === 401) {
          // If the user is not authenticated, redirect to the login page
          navigate('/')
        } else {
          throw new Error(`Server responded with status: ${response.status}`)
        }
      } catch (error) {
        console.error('Error fetching puzzles:', error)
        setIsLoadingPuzzles(false)
      }
    }
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Function that redirects the user to the add puzzle page.
   */
  const handleAddPuzzle = () => {
    navigate('/add-puzzle')
  }

  /**
   * Function that toggles the visibility of the filter field.
   */
  const handleToggleFilter = () => {
    setShowFilters(!showFilters)
  }

  /**
   * Function that handles the change of the radio buttons for the lent out filter.
   * @param {Object} event - The event object.
   */
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  // Get the unique numbers of pieces from the puzzles
  const uniquePieceNumbers = [...new Set(puzzlesArray.map((puzzle) => puzzle.piecesNumber))].filter(Boolean).sort((a, b) => a - b)

  /**
   * Function that toggles the selected number of pieces in the filter.
   * @param {number} pieceNumber - The number of pieces to toggle.
   */
  const handeTogglePieceFilter = (pieceNumber) => {
    // Check if the number of pieces is already included in the selected pieces list.
    if (selectedPieces.includes(pieceNumber)) {
      // If the number of pieces is already selected, remove it from the list.
      // Filter out the number of pieces from the selected pieces array.
      setSelectedPieces(selectedPieces.filter((piece) => piece !== pieceNumber))
    } else {
      // If the number of pieces is not in the list, add it to the list.
      // This is done by creating a new array with all current selected pieces plus the new number of pieces.
      setSelectedPieces([...selectedPieces, pieceNumber])
    }
  }


  return (
    <>
      <div className='option-button-container'>
        <div className='main-options-area'>
          <Button
            id='filter-button'
            onClick={handleToggleFilter}
            imageSrc={filter}
          />
          <Button
            onClick={handleAddPuzzle}
            buttonText='+'
          />
        </div>
        {showFilters && (
          <div className='filter-field'>
            <fieldset id='lent-out-button-field'>
              <div>
                <input type="radio" id="all" name="lentOption" value="all" checked={selectedOption === 'all'} onChange={handleOptionChange} />
                <label htmlFor="all" className={`${selectedOption === 'all' ? 'active-option' : ''}`}>Alla</label>
              </div>
              <div>
                <input type="radio" id="lent" name="lentOption" value="lent" checked={selectedOption === 'lent'} onChange={handleOptionChange} />
                <label htmlFor="lent" className={`${selectedOption === 'lent' ? 'active-option' : ''}`}>Utlånade</label>
              </div>
              <div>
                <input type="radio" id="notLent" name="lentOption" value="notLent" checked={selectedOption === 'notLent'} onChange={handleOptionChange} />
                <label htmlFor="notLent" className={`${selectedOption === 'notLent' ? 'active-option' : ''}`}>Inte utlånade</label>
              </div>
            </fieldset>
            <div id='pieces-number-filter'>
              <ul id='pieces-number-options'>
                {uniquePieceNumbers.map((pieceNumber) => (
                  <li key={pieceNumber}>
                    <label key={pieceNumber}>
                      <input
                        type='checkbox'
                        checked={selectedPieces.includes(pieceNumber)}
                        onChange={() => handeTogglePieceFilter(pieceNumber)}
                      />
                      {pieceNumber}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className='puzzles'>
        {isLoadingPuzzles ? (
          <div className='loading'>
            <p>Laddar...</p>
          </div>
        ) : (
          <ul>
            {puzzlesArray.length > 0 ? ( // Check if there are puzzles to show.
              // Conditional checks to determine if the puzzle should be filtered out based on selected filters.
              puzzlesArray.map((puzzle) => (selectedOption === 'notLent' && puzzle.isLentOut) ||
                (selectedOption === 'lent' && !puzzle.isLentOut) ||
                (selectedPieces.length > 0 && !selectedPieces.includes(puzzle.piecesNumber)) ?
                null : ( // Return null to exclude the puzzle from rendering if any conditions are met.
                  // Render a list item for each puzzle that passes the filters.
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
              // Display a message if there are no puzzles to show.
              <p id='no-puzzles'>Inga pussel att visa</p>
            )}
          </ul>
        )}
      </div>
    </>
  )
}

export default MyPuzzles