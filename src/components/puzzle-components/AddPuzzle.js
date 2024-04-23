import PuzzleForm from './PuzzleForm'

const AddPuzzle = () => {
  return (
    <div>
      <PuzzleForm
        fetchUrl='my/puzzles'
        method='POST'
        navigateUrl={`/my-puzzles`}
        buttonText='Lägg till pussel'
      />
    </div>
  )
}

export default AddPuzzle
