import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../Button'
import { TokenContext } from '../contexts/TokenContext'
import nullPuzzleImage from '../../assets/images/null-puzzle.jpeg'
import { useNavigate } from 'react-router-dom'

const SinglePuzzle = () => {
    const navigate = useNavigate()
    const fetchWithToken = useContext(TokenContext)
    const { puzzleId } = useParams()  // This hooks fetch the params from the URL
    const [puzzle, setPuzzle] = useState(null)

    useEffect(() => {
        // Simulate fetching puzzle data based on `puzzleId`
        const fetchPuzzle = async () => {
            const response = await fetchWithToken(`${process.env.REACT_APP_API_URL}/my/puzzles/${puzzleId}`)
            const data = await response.json()
            if (!data.imageUrl) {
                data.imageUrl = nullPuzzleImage
            }
            console.log(data)
            setPuzzle(data)
        }

        fetchPuzzle()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!puzzle) {
        return (
            <div className='loading'>
                <p>Laddar...</p>
            </div>
        )
    }

    const handleGoToAllPuzzles = () => {
        navigate('/my-puzzles')
    }

    const handleEditPuzzle = () => {
        navigate(`/puzzles/${puzzleId}/edit`, { state: { puzzle } })
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
                <p><span className='heavy'>Antal bitar:</span> {puzzle.piecesNumber ? (puzzle.piecesNumber) : ('-')}</p>
                {puzzle.piecesNumber ? (<p><span className='heavy'>Antal saknade bitar:</span> {!puzzle.complete ? (puzzle.missingPiecesNumber) : ('0')}</p>) : null}
                <p><span className='heavy'>Storlek i cm:</span> {puzzle.sizeWidth ? (`${puzzle.sizeWidth} x ${puzzle.sizeHeight}`) : ('-')}</p>
                <p><span className='heavy'>Tillverkare:</span> {puzzle.manufacturer ? (puzzle.manufacturer) : ('-')}</p>
                <p><span className='heavy'>Senast lagt:</span> {puzzle.lastPlayed ? (puzzle.lastPlayed) : ('-')}</p>
                <p><span className='heavy'>Förvaras i/på:</span> {puzzle.location ? (puzzle.location) : ('-')}</p>
                <p><span className='heavy'>Privat anteckning:</span> {puzzle.privateNote ? (puzzle.privateNote) : ('-')}</p>
                <p><span className='heavy'>Delad anteckning:</span> {puzzle.sharedNote ? (puzzle.sharedNote) : ('-')}</p>
                {puzzle.isLentOut ? (<p><span className='heavy'>Utlånat till:</span> {puzzle.lentOutToString}</p>) : null}
            </div>
            <div className='button-area'>
            <Button
                onClick={handleGoToAllPuzzles}
                buttonText='Visa alla pussel'
            />
            <Button
                onClick={handleEditPuzzle}
                buttonText='Ändra'
            />
            </div>
        </div>
    )
}

export default SinglePuzzle