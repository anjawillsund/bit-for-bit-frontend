import Button from '../Button'
import PuzzleForm from './PuzzleForm'
import { useNavigate } from 'react-router-dom'

const AddPuzzle = () => {
  const navigate = useNavigate()

  return (
    <div>
      <PuzzleForm
        fetchUrl='my/puzzles'
        method='POST'
        navigateUrl={`/my-puzzles`}
        buttonText='Lägg till pussel'
      />
      <Button
        buttonText='Tillbaka'
        onClick={() => navigate('/my-puzzles')} 
      />
    </div>
  )
}

export default AddPuzzle
