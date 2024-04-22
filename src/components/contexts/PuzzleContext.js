import { createContext, useState } from 'react'
import { useTokenContext } from './TokenContext'

/**
 * Context for managing movie-related data and functions.
 */
export const PuzzleContext = createContext()

/**
 * Provides the puzzle context to its children components.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The JSX element representing the PuzzleContextProvider component.
 */
const PuzzleContextProvider = ({ children }) => {
  const fetchWithToken = useTokenContext()

  const [isUserActive, setIsUserActive] = useState(false)
  const [puzzles, setPuzzles] = useState([])
  const [puzzlesArray, setPuzzlesArray] = useState([])
  const [isLoadingPuzzles, setIsLoadingPuzzles] = useState(true)

  const fetchUserPuzzles = async () => {
    try {
      console.log('Fetching user puzzles')
      const response = await fetchWithToken(`${process.env.REACT_APP_API_URL}/my/puzzles`, {
        method: 'GET'
      })
      if (response.ok) {
        const puzzles = await response.json()
        console.log(puzzles)
        setPuzzlesArray(puzzles)
      } else {
        console.log('Could not fetch user puzzles')
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Resets the state of the PuzzleContextProvider component.
   */
  const resetState = () => {
    setPuzzles([])
    setPuzzlesArray([])
    setIsLoadingPuzzles(true)
    setIsUserActive(false)
  }

  return <PuzzleContext.Provider
    value={{
      fetchUserPuzzles,
      isLoadingPuzzles,
      isUserActive,
      puzzles,
      puzzlesArray,
      resetState,
      setIsLoadingPuzzles,
      setIsUserActive,
      setPuzzles,
      setPuzzlesArray
    }}>
    {children}
  </PuzzleContext.Provider>
}

export default PuzzleContextProvider