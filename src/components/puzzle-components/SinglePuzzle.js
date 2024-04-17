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
        <div className='puzzle-area'>
            <div className='puzzle-info'>
                {puzzle.imageUrl ? (
                <img src={puzzle.imageUrl} alt={puzzle.title} />
                ) : (
                    <img src={nullPuzzleImage} alt={''} />
                )
                }
                <h3>{puzzle.title}</h3>
                <p><span className='heavy'>Antal bitar:</span> {puzzle.piecesNumber ? (puzzle.piecesNumber) : ( '-' )}</p>
                <p><span className='heavy'>Tillverkare:</span> {puzzle.manufacturer ? (puzzle.manufacturer) : ('-')}</p>
                <p><span className='heavy'>Privat anteckning:</span> {puzzle.privateNote ? (puzzle.privateNote) : ('-')}</p>
                <p><span className='heavy'>Delad anteckning:</span> {puzzle.sharedNote ? (puzzle.sharedNote) : ('-')}</p>
                <p><span className='heavy'>Storlek i cm:</span> {puzzle.sizeWidth ? (`${puzzle.sizeWidth} x ${puzzle.sizeHeight}`) : ('-')}</p>
                <p><span className='heavy'>Senast lagt:</span> {puzzle.lastPlayed ? (puzzle.lastPlayed) : ('-')}</p>
            </div>
        </div>
    )
}

export default SinglePuzzle