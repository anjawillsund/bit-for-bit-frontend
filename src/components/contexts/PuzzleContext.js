import { createContext, useState } from 'react'

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
  const [puzzlesArray, setPuzzlesArray] = useState([])
  const [isLoadingPuzzles, setIsLoadingPuzzles] = useState(true)

  /**
   * Resets the state of the PuzzleContextProvider component.
   */
  const resetState = () => {
    setPuzzlesArray([])
    setIsLoadingPuzzles(true)
  }

  return <PuzzleContext.Provider
    value={{
      isLoadingPuzzles,
      puzzlesArray,
      resetState,
      setIsLoadingPuzzles,
      setPuzzlesArray
    }}>
    {children}
  </PuzzleContext.Provider>
}

export default PuzzleContextProvider