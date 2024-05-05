
import Button from '../Button'
import { useContext } from 'react'
import nullPuzzleImage from '../../assets/images/null-puzzle.jpeg'
import PuzzleForm from './PuzzleForm'
import { useLocation, useParams } from 'react-router-dom'
import { TokenContext } from '../contexts/TokenContext'
import { useNavigate } from 'react-router-dom'

const EditPuzzle = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { puzzle } = location.state || {}
  const { puzzleId } = useParams()
  const fetchWithToken = useContext(TokenContext)

  const handleClickDelete = async () => {
    console.log(puzzleId)
    try {
      const response = await fetchWithToken(`${process.env.REACT_APP_API_URL}/my/puzzles/${puzzleId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        console.log('Puzzle deleted')
        navigate('/my-puzzles')
      } else {
        console.log('Could not delete puzzle')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='puzzle-area'>
      <div className='puzzle-info'>
        {puzzle.imageUrl ? (
          <img src={puzzle.imageUrl} alt={puzzle.title} />
        ) : (
          <img src={nullPuzzleImage} alt={''} />
        )
        }
        <PuzzleForm
          fetchUrl={`my/puzzles/${puzzleId}`}
          method='PUT'
          navigateUrl={`/puzzles/${puzzleId}`}
          buttonText='Spara'
        />
        <div className='button-area'>
          <Button
            id='delete-button'
            buttonText='Radera pussel'
            onClick={() => handleClickDelete()}
          />
          <Button
            buttonText='Tillbaka'
            onClick={() => navigate(`/puzzles/${puzzleId}`)}
          />
        </div>
      </div>
    </div>
  )
}

export default EditPuzzle
