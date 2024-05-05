import Button from '../Button'
import PuzzleForm from './PuzzleForm'
import { useNavigate } from 'react-router-dom'

const AddPuzzle = () => {
  const navigate = useNavigate()

  return (
    <div className='puzzle-area'>
      <div className='puzzle-info'>
        <PuzzleForm
          fetchUrl='my/puzzles'
          method='POST'
          navigateUrl={`/my-puzzles`}
          buttonText='Lägg till pussel'
        />
        <div className='button-area'>
          <Button
            buttonText='Tillbaka'
            onClick={() => navigate('/my-puzzles')}
          />
        </div>
      </div>
    </div>
  )
}

export default AddPuzzle
