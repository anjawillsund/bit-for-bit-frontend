import { createContext, useState } from 'react'
// import { useTokenContext } from './TokenContext'

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
  // const fetchWithToken = useTokenContext()

  const [isUserActive, setIsUserActive] = useState(false)

  /**
   * Resets the state of the PuzzleContextProvider component.
   */
  const resetState = () => {
    setIsUserActive(false)
  }

  return <PuzzleContext.Provider
    value={{
      isUserActive,
      setIsUserActive,
      resetState
    }}>
    {children}
  </PuzzleContext.Provider>
}

export default PuzzleContextProvider