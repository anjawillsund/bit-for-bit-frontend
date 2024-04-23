
import PuzzleForm from './PuzzleForm'
import { useLocation } from 'react-router-dom'

const EditPuzzle = () => {
  const location = useLocation()
  const { puzzle } = location.state || {}

  return (
    <div>
      <PuzzleForm
        fetchUrl={`my/puzzles/${puzzle.id}`}
        method='PUT'
        navigateUrl={`/puzzles/${puzzle.id}`}
        buttonText='Spara'
      />
    </div>
  )
}

export default EditPuzzle
