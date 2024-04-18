import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { TokenContextProvider } from './components/contexts/TokenContext'
import AddPuzzle from './components/puzzle-components/AddPuzzle'
import CreateUser from './components/user-components/CreateUser'
import MyPuzzles from './components/profile-components/MyPuzzles'
import Navigation from './components/navigation-components/Navigation'
import PuzzleContextProvider from './components/contexts/PuzzleContext'
import SinglePuzzle from './components/puzzle-components/SinglePuzzle'
import StartPage from './components/StartPage'

function App() {
  /**
   * Checks if the user is logged in.
   *
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
  const isLoggedIn = () => {
    const token = localStorage.getItem('token')
    return !!token;
  }

  return <Router basename={'/bit-for-bit'}>
    <TokenContextProvider>
      <PuzzleContextProvider>
        <div className='App'>
          <Routes>
            <Route exact path='/' element={<StartPage />} />
            <Route path='/create-user' element={<CreateUser />} />
            <Route path='/*' element={isLoggedIn() ?
              <>
                <div className="container">
                  <div className='navigation-container'>
                    <Navigation className='navigation' />
                  </div>
                  <div className='content'>
                    <Routes>
                      <Route path='/add-puzzle' element={<AddPuzzle />} />
                      <Route path='/my-puzzles' element={<MyPuzzles />} />
                      <Route path='/puzzles/:puzzleId' element={<SinglePuzzle />} />
                    </Routes>
                  </div>
                </div>
              </>
            : <Navigate to='/' />} />
          </Routes>
        </div>
      </PuzzleContextProvider>
    </TokenContextProvider>
  </Router>
}

export default App
