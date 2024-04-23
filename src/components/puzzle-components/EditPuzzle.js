
import Button from '../Button'
import { useContext } from 'react'
import PuzzleForm from './PuzzleForm'
import { useLocation } from 'react-router-dom'
import { TokenContext } from '../contexts/TokenContext'
import { useNavigate } from 'react-router-dom'

const EditPuzzle = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { puzzle } = location.state || {}
  const fetchWithToken = useContext(TokenContext)

  const handleClickDelete = async (id) => {
    try {
      const response = await fetchWithToken(`${process.env.REACT_APP_API_URL}/my/puzzles/${id}`, {
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
    <div>
      <PuzzleForm
        fetchUrl={`my/puzzles/${puzzle.id}`}
        method='PUT'
        navigateUrl={`/puzzles/${puzzle.id}`}
        buttonText='Spara'
      />
      <Button
        buttonText='Radera pussel'
        onClick={() => handleClickDelete(puzzle.id)}
      />
      <Button
        buttonText='Tillbaka'
        onClick={() => navigate(`/puzzles/${puzzle.id}`)} 
      />
    </div>
  )
}

export default EditPuzzle
