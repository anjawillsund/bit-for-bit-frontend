import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TokenContext } from '../contexts/TokenContext'
import nullPuzzleImage from '../../assets/images/null-puzzle.jpeg'

const SinglePuzzle = () => {
    const fetchWithToken = useContext(TokenContext)
    const { puzzleId } = useParams()  // This hooks fetch the params from the URL
    const [puzzle, setPuzzle] = useState(null)

    useEffect(() => {
        // Simulate fetching puzzle data based on `puzzleId`
        const fetchPuzzle = async () => {
            const response = await fetchWithToken(`http://localhost:8090/my/puzzles/${puzzleId}`)
            const data = await response.json()
            setPuzzle(data)
        }

        fetchPuzzle()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!puzzle) {
        return <div>Laddar...</div>
    }

    return (
        <div>
            {puzzle.imageUrl ? (
              <img src={puzzle.imageUrl} alt={puzzle.title} />
              ) : (
                <img src={nullPuzzleImage} alt={''} />
              )
            }
            <h1>{puzzle.title}</h1>
            <p>Antal bitar: {puzzle.piecesNumber ? (puzzle.piecesNumber) : ( '-' )}</p>
            <p>Tillverkare: {puzzle.manufacturer ? (puzzle.manufacturer) : ('-')}</p>
            <p>Privat anteckning: {puzzle.privateNote ? (puzzle.privateNote) : ('-')}</p>
            <p>Delad anteckning: {puzzle.sharedNote ? (puzzle.sharedNote) : ('-')}</p>
            <p>Storlek i cm: {puzzle.sizeWidth ? (`${puzzle.sizeWidth} x ${puzzle.sizeHeight}`) : ('-')}</p>
            <p>Senast lagt: {puzzle.lastPlayed ? (puzzle.lastPlayed) : ('-')}</p>
        </div>
    )
}

export default SinglePuzzle